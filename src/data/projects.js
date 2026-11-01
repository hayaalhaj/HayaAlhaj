import muamalati from "../assets/muamalati.png";
import hawan from "../assets/hawan1.jpg";
import emotion from "../assets/emotion.jpg";
import muamalatiShot1 from "../assets/Mu-amalati-10-29-2026_08_00_AM.png";
import muamalatiShot2 from "../assets/Mu-amalati-10-29-2026_08_03_AM.png";
import muamalatiShot3 from "../assets/Mu-amalati-10-29-2026_08_02_AM.png";
import hawanshot1 from "../assets/Hawan-11-01-2026_08_31_AM (1).png";
import hawanshot2 from "../assets/Hawan-11-01-2026_08_31_AM (2).png";
import hawanshot3 from "../assets/Hawan-11-01-2026_08_31_AM.png";
import hawanshot4 from "../assets/Hawan-11-01-2026_08_32_AM.png";
import hawanshot5 from "../assets/Hawan-11-01-2026_08_33_AM.png";
import hawanshot6 from "../assets/Hawan-11-01-2026_08_36_AM.png";
/* Everything that is the same in every language lives here, in the same order as
   projects.items in translations.js. The text of each project comes from translations.js.

   For each project you can fill in:
     hasDetails   true  -> the "View Details" button appears and opens /projects/<slug>
     video        a YouTube or Google Drive link, or a video file path like "/videos/hawan.mp4"
                  (leave "" to show the project image instead)
     github       link to the code (leave "" to hide the button)
     liveUrl      link to a live demo (leave "" to hide the button)
     screenshots  more images: import them above, then list them like [shot1, shot2]
*/
export const projectMeta = [
  {
    slug: "muamalati",
    hasDetails: true,
    image: muamalati,
    tools: ["React.js", "Tailwind CSS", "React Query", "Recharts"],
    video: "https://drive.google.com/file/d/13rr76V9FV8bRNemqk_NBHQbzKt2FMEit/view?usp=sharing",
    github: "https://github.com/hayaalhaj/Mu-amalati_FrontEnd",
    liveUrl: "",
screenshots: [muamalatiShot1, muamalatiShot2, muamalatiShot3],  },
  {
    slug: "hawan",
    hasDetails: true,
    image: hawanshot3,
    tools: ["React.js", "Bootstrap", "Leaflet"],
    video: "",
    github: "https://github.com/hayaalhaj/hawan",
    liveUrl: "",
    screenshots: [hawanshot3 , hawanshot2 , hawanshot4 , hawanshot1 , hawanshot5 , hawanshot6],
  },
  {
    slug: "emotion-in-motion",
    hasDetails: false, // change to true (and add its text) when you want a page for it
    image: emotion,
    tools: ["React.js", "GSAP", "ScrollTrigger", "Tailwind CSS"],
    video: "",
    github: "https://github.com/hayaalhaj/codveda-task-2-level3-emotion-in-motion",
    liveUrl: "http://emotion-in-motion.netlify.app",
    screenshots: [],
  },

];