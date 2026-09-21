# Announcer sounds

`announcer.mp3`: "Old-school arena FPS announcer voice lines" by jkerman
https://freesound.org/s/718360/ , license CC BY 4.0 (credit required, shown in
the page footer). One recording with every line; `src/announcer.ts` plays
slices of it by start time (audio sprite).

## Overriding a line

Put your audio file in this folder and list it in `overrides.json` here:

```json
{ "doublekill": "my-double.wav", "godlike": "godlike.mp3" }
```

Each listed file replaces that line. Reload the page after changes.

Ids: getready, fight, victory, defeat, killstreak, rampage, godlike,
unstoppable, revenge, domination, humiliated, epic, holyshit, firstblood,
doublekill, triplekill, quadkill, pentacrush, obliterated, ludicrousgibs,
suddendeath, lastmanstanding, quickdraw, flawless (plus the CTF lines).

## When they play

| Event | Line |
|---|---|
| round starts (countdown) | getready |
| first hit of a round | firstblood |
| streak 2 / 3 / 4 / 5 / 6 | doublekill / triplekill / quadkill / pentacrush / obliterated |
| streak 8 / 10 / 12 | rampage / domination / unstoppable |
| streak 15 / 18 / 21 | godlike / ludicrousgibs / holyshit |
| round over, score below 0 | humiliated |
| round over, no misses | flawless |
| round over, new best | victory |

Edit `STREAK_LINES` in `src/announcer.ts` to change the steps.
