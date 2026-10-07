# Yale Undergraduate Piano Collective — yalepiano.org

Static site, no build step. Open `index.html` in a browser or serve the folder.

## Editing

- **Events** → edit the list at the top of `assets/js/events.js`. Upcoming vs. past is
  worked out automatically from the date, so nothing needs moving.
- **Masterclass guest photos** → drop the file into `images/masterclass_photos/` using the
  filename already referenced in `events.html` (e.g. `jeffrey_cohen.jpg`, `michelle_cann.jpg`).
  Until the file exists the page shows the guest's initials instead.
- **Board** → `about.html`, section `#board`. Photos live in `images/board_2526_photos/`.
- **Photo wall** → add the filename to the list at the bottom of `media.html`.
- **Videos** → `media.html`; each video is a `div.yt` with the YouTube ID in `data-id`.
- **Look & feel** → colours, fonts and spacing are variables at the top of `assets/css/yupc.css`.
- **Home intro timing** → `assets/js/yupc.js`, "Home intro sequence".

`members.html` only redirects to `about.html#board` so old links keep working.
