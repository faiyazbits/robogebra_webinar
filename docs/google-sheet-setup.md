# Google Sheet setup for webinar registrations

The registration form (`app/components/register-form.tsx`) submits to a Server Action (`app/actions/register.ts`), which POSTs each registration as JSON to a Google Apps Script web app. The script adds one row per registration to a Google Sheet.

```
Teacher's browser ──▶ Next.js Server Action ──▶ Apps Script web app ──▶ Google Sheet
                                         (GOOGLE_SHEET_WEBHOOK_URL)
```

Setup takes about 10 minutes.

---

## 1. Create the Sheet

1. Go to <https://sheets.new> and name the spreadsheet something like **Webinar Registrations**.
2. Rename the first tab (bottom-left) to exactly **`Registrations`**.
3. Put these headers in row 1, from A1 to F1:

   | A | B | C | D | E | F |
   |---|---|---|---|---|---|
   | Submitted At | Name | School | District | State | Phone |

4. Optional: select column F and choose **Format → Number → Plain text** so phone numbers keep a leading `+`.

## 2. Add the Apps Script

1. In the Sheet, open **Extensions → Apps Script**.
2. Delete the sample code in `Code.gs` and paste this:

   ```js
   const SHEET_NAME = "Registrations";

   function doPost(e) {
     const lock = LockService.getScriptLock();
     lock.waitLock(10000); // avoid two submissions writing the same row

     try {
       const data = JSON.parse(e.postData.contents);

       // Optional shared secret (see step 3).
       const secret = PropertiesService.getScriptProperties().getProperty("SECRET");
       if (secret && data.secret !== secret) {
         return json({ ok: false, error: "unauthorized" });
       }

       const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
       if (!sheet) return json({ ok: false, error: "sheet not found" });

       sheet.appendRow([
         data.submittedAt || new Date(),
         data.name || "",
         data.school || "",
         data.district || "",
         data.state || "",
         data.phone || "",
       ]);

       return json({ ok: true });
     } catch (err) {
       return json({ ok: false, error: String(err) });
     } finally {
       lock.releaseLock();
     }
   }

   function json(obj) {
     return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
       ContentService.MimeType.JSON,
     );
   }
   ```

3. Click the **Save** icon and give the project a name, e.g. *Registration webhook*.

## 3. (Recommended) Add a shared secret

The web app URL accepts requests from anyone who knows it. A secret makes sure only your site can add rows.

1. In Apps Script, open **Project Settings** (gear icon) → **Script Properties** → **Add script property**.
2. Property: `SECRET`. Value: a long random string. One way to generate it: run `openssl rand -hex 24` in a terminal.
3. Put the same value in `GOOGLE_SHEET_WEBHOOK_SECRET` (step 5).

If you skip this step, leave `GOOGLE_SHEET_WEBHOOK_SECRET` empty. The script accepts any request when `SECRET` isn't set.

## 4. Deploy as a web app

1. Click **Deploy → New deployment**.
2. Click the gear next to *Select type* and choose **Web app**.
3. Settings:
   - **Description:** `v1`
   - **Execute as:** **Me** (your Google account)
   - **Who has access:** **Anyone**
4. Click **Deploy**, then **Authorize access** and pick your Google account.
   - Google may show *"Google hasn't verified this app"*. This is your own script, so click **Advanced → Go to Registration webhook (unsafe)** → **Allow**.
5. Copy the **Web app URL**. It looks like:

   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

   This is your webhook URL.

## 5. Set the environment variables

Copy `.env.example` to `.env.local` in the project root and fill it in:

```bash
GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/AKfycb.../exec
GOOGLE_SHEET_WEBHOOK_SECRET=the-secret-from-step-3   # or leave empty
NEXT_PUBLIC_VERTEX_WHATSAPP_URL=https://chat.whatsapp.com/your-invite-code
```

Restart `npm run dev` after changing `.env.local`.

For production, add the same three variables in your hosting provider's settings (on Vercel: **Project → Settings → Environment Variables**), then redeploy. `NEXT_PUBLIC_*` values are baked in at build time, so a change to the WhatsApp link needs a rebuild.

`.env.local` is gitignored. Never commit real values.

## 6. Test it

From a terminal:

```bash
curl -L -X POST \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test Teacher","school":"Test School","district":"Pune","state":"Maharashtra","phone":"9876543210","submittedAt":"test","secret":"the-secret-from-step-3"}' \
  "https://script.google.com/macros/s/AKfycb.../exec"
```

You should see `{"ok":true}` and a new row in the Sheet. Then submit the form on the page: a row appears, and the browser redirects to the WhatsApp community.

## Updating the script later

Changing the code isn't enough; you have to publish a new version:

1. **Deploy → Manage deployments**.
2. Click the pencil icon on the existing deployment.
3. **Version → New version** → **Deploy**.

The URL stays the same. Don't use **New deployment** for updates: it creates a new URL, and you'd then have to update `GOOGLE_SHEET_WEBHOOK_URL` everywhere.

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| Form says "Something went wrong" | `GOOGLE_SHEET_WEBHOOK_URL` not set, or the dev server wasn't restarted after editing `.env.local`. Check the server terminal logs. |
| curl returns an HTML sign-in page | **Who has access** isn't set to **Anyone**. Edit the deployment. |
| `{"ok":false,"error":"unauthorized"}` | `GOOGLE_SHEET_WEBHOOK_SECRET` doesn't match the `SECRET` script property. |
| `{"ok":false,"error":"sheet not found"}` | The tab isn't named exactly `Registrations`. |
| Code changes don't take effect | You need to publish a **New version** (see above). |
| Phone loses its leading `+` | Format column F as Plain text (step 1.4). |
| curl without `-L` shows "Moved Temporarily" | Apps Script replies with a redirect; `-L` follows it. The server's `fetch` follows redirects automatically. |
