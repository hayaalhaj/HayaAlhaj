/* Your graphic design work. Add one block per design, newest or best first.

   Steps for each design:
   1. Put the images in src/assets/designs/ (names without spaces, compressed to .webp or .jpg).
   2. Import them below, then add a block to the list.

   Fields:
     id        any unique name, e.g. "clinic-offer"
     category  "social" (single post or ad) | "carousel" (several slides) | "motion" (After Effects video)
     concept   true shows a small "Concept" label (for personal or experimental work, which builds trust)
     title     the name in both languages
     slides    the images in order; the first one is used as the cover
     video     for motion work: a YouTube or Google Drive link (use instead of slides)
     embed     a Behance project: open it on Behance, click the Share icon, choose "Copy Embed", and paste the
               code between backticks (use instead of slides). It appears inside your page as a Behance card.
     cover     the image shown on the card for a video (required when you use video)

   Example:

   import clinicCover from "../assets/designs/clinic-1.webp";
   import clinic2 from "../assets/designs/clinic-2.webp";
   import clinic3 from "../assets/designs/clinic-3.webp";

   {
     id: "clinic-offer",
     category: "carousel",
     concept: false,
     title: { en: "Clinic offer carousel", ar: "كاروسيل عرض العيادة" },
     slides: [clinicCover, clinic2, clinic3],
   },

   Example for a Behance project:

   {
     id: "behance-ad-1",
     category: "social",
     concept: true,
     title: { en: "Social media ad", ar: "إعلان سوشيال ميديا" },
     embed: `PASTE THE EMBED CODE COPIED FROM BEHANCE HERE`,
   },
*/

export const designs = [
    {
        id: "behance-256308507",
        category: "social",
        concept: true, // remove this line if it is real client work
        title: { en: "Social media ad", ar: "إعلان سوشيال ميديا" }, // replace with the real project name
        embed: `<iframe src="https://www.behance.net/embed/project/256308507?ilo0=1" height="316" width="404" allowfullscreen lazyload frameborder="0" allow="clipboard-write" refererPolicy="strict-origin-when-cross-origin"></iframe>`,
    },
    {
        id: "behance-256308507",
        category: "social",
        concept: true, // remove this line if it is real client work
        title: { en: "Social media ad", ar: "إعلان سوشيال ميديا" }, // replace with the real project name
        embed: `<iframe src="https://www.behance.net/embed/project/242292199?ilo0=1" height="316" width="404" allowfullscreen lazyload frameborder="0" allow="clipboard-write" refererPolicy="strict-origin-when-cross-origin"></iframe>`,
    },
    {
        id: "behance-256308507",
        category: "social",
        concept: true, // remove this line if it is real client work
        title: { en: "Social media ad", ar: "إعلان سوشيال ميديا" }, // replace with the real project name
        embed: `<iframe src="https://www.behance.net/embed/project/242290925?ilo0=1" height="316" width="404" allowfullscreen lazyload frameborder="0" allow="clipboard-write" refererPolicy="strict-origin-when-cross-origin"></iframe>`
    },
    {
        id: "behance-256308507",
        category: "social",
        concept: true, // remove this line if it is real client work
        title: { en: "Social media ad", ar: "إعلان سوشيال ميديا" }, // replace with the real project name
        embed: `<iframe src="https://www.behance.net/embed/project/242291197?ilo0=1" height="316" width="404" allowfullscreen lazyload frameborder="0" allow="clipboard-write" refererPolicy="strict-origin-when-cross-origin"></iframe>`,
    },
    {
        id: "behance-256308507",
        category: "social",
        concept: true, // remove this line if it is real client work
        title: { en: "Social media ad", ar: "إعلان سوشيال ميديا" }, // replace with the real project name
        embed: `<iframe src="https://www.behance.net/embed/project/240374703?ilo0=1" height="316" width="404" allowfullscreen lazyload frameborder="0" allow="clipboard-write" refererPolicy="strict-origin-when-cross-origin"></iframe>`,
    },
    {
        id: "behance-256308507",
        category: "social",
        concept: true, // remove this line if it is real client work
        title: { en: "Social media ad", ar: "إعلان سوشيال ميديا" }, // replace with the real project name
        embed: `<iframe src="https://www.behance.net/embed/project/240374357?ilo0=1" height="316" width="404" allowfullscreen lazyload frameborder="0" allow="clipboard-write" refererPolicy="strict-origin-when-cross-origin"></iframe>`,
    },

];

export const behanceUrl = "https://www.behance.net/hayaalhaj/";