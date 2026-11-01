/* All visible text lives here, in English and Arabic.
   Components read it with: const { t } = useSettings();  ->  t.hero.name, t.about.title ...
   Names of tools and technologies (React, GSAP, Photoshop...) stay in English in both languages. */

export const translations = {
  en: {
    brand: "HAYA ALHAJ",

    nav: {
      about: "About",
      work: "Work",
      design: "Design",
      experience: "Experience",
      skills: "Skills",
      courses: "Courses",
      contact: "Contact",
      resume: "Resume",
      mainLabel: "Main",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      switchToDark: "Switch to dark mode",
      switchToLight: "Switch to light mode",
      otherLanguage: "العربية",
      switchLanguage: "Switch language to Arabic",
    },

    hero: {
      greeting: "Hi, I'm",
      name: "Haya Alhaj",
      roles: ["Junior Front-End Developer", "Junior Graphic Designer"],
      separator: ", ",
      description:
        "I design creative social media content and build responsive, dynamic websites with a focus on modern design and great user experiences.",
      viewWork: "View my work",
      letsWork: "Let's work together",
      imageAlt: "Illustration of Haya Alhaj",
    },

    about: {
      title: "About Me",
      subtitle: "Automation & Computing Engineering | Graduate",
      p1: "I’m an Automation & Computing Engineering graduate with a passion for Front-End Development and Graphic Design. I build responsive and dynamic websites using modern web technologies, while also creating creative and engaging designs for social media.",
      p2: "I enjoy combining technology and creativity to turn ideas into clean, functional, and visually appealing digital experiences. I’m always looking to learn, improve my skills, and take on new challenges.",
    },

    projects: {
      heading: "Projects",
      roleLabel: "My Role :",
      roleValue: "Front-End Developer, UI Design & Implementation",
      toolsLabel: "Tools :",
      viewDetails: "View Details",
      viewDetailsOf: (title) => `View details of ${title}`,
      details: {
        back: "Back to projects",
        overview: "Overview",
        featuresHeading: "Key features",
        video: "Video walkthrough",
        videoTitle: (title) => `Video walkthrough of ${title}`,
        screenshots: "Screenshots",
        github: "View code on GitHub",
        live: "Live demo",
        features: {
          muamalati: [
            "Role-based dashboards for employees, department managers, and administrators",
            "Attendance tracking",
            "Transaction management",
            "Approval workflows",
            "Notifications",
          ],
          hawan: [
            "Responsive landing, login, and sign-up pages",
            "Location selection with Leaflet Maps",
            "Dedicated interfaces for passengers and for drivers",
            "Ride-status tracking interfaces",
          ],
        },
      },
      items: [
        {
          title: "Mu'amalati Platform",
          subtitle: "Transaction Management System",
          imageAlt: "Screenshot of the Mu'amalati platform dashboard",
          description:
            "Mu-amalati is an internal employee transaction management system. I built the complete front-end with role-based dashboards for employees, department managers, and administrators, covering attendance tracking, transactions, approvals, and notifications.",
        },
        {
          title: "Hawan Platform",
          subtitle: "Taxi Booking System",
          imageAlt: "Screenshot of the Hawan taxi booking platform",
          description:
            "Hawan is a Taxi Booking System I built the complete front-end with responsive landing, login, and sign-up interfaces, integrated Leaflet Maps for location selection, and developed dedicated interfaces for passengers and drivers, ride-status tracking interfaces.",
        },
        {
          title: "Emotion in Motion",
          subtitle: "Interactive Website",
          imageAlt: "Screenshot of the Emotion in Motion website",
          description:
            "Emotion in Motion is an interactive website that explores how emojis communicate emotions in the digital world. My main focus was creating a visually engaging and responsive experience while organizing the project into reusable components.",
        },
      ],
    },

    experience: {
      heading: "Experience",
      items: [
        {
          title: "Google Ads Campaign Specialist (Freelance)",
          company: "Freelance for a software company in the UAE",
          period: "4 Oct 2026 – Present",
          points: [
            "Took over management of existing Google Ads campaigns for clients in Kuwait, reviewing performance and editing them to improve results.",
            "Created and launched new Google Ads for clients.",
            "Communicated directly with clients to understand their needs, share updates, and apply their feedback.",
          ],
        },
        {
          title: "Volunteer",
          company: "Al-Tamayuz Association for Orphan Sponsorship",
          period: "16 Sep 2026 – Present",
          points: [
            "Took part in volunteer activities supporting orphans, such as distributing clothes and supplies.",
            "Provided technical volunteering support to the association.",
          ],
        },
        {
          title: "Front-End Development Intern",
          company: "Codveda Technology",
          period: "17 Aug 2026 – 17 Sep 2026 | Remote",
          points: [
            "Completed a 3-level Front-End Development internship focused on JavaScript, React, REST APIs, performance optimization, and modern UI development.",
            "Developed a responsive React weather application with REST API integration, dynamic data fetching, search functionality, and API-driven data display.",
            "Improved web performance and developed interactive animations using Framer Motion to create smooth and responsive user experiences.",
          ],
        },
        {
          title: "Graphic Designer",
          company: "Elegant Touch, Aesthetic Clinic, UAE",
          period: "July 2026 – August 2026",
          points: [
            "Designed creative Instagram posts and social media content for the clinic.",
            "Created visual designs using Adobe Photoshop and Adobe Illustrator while maintaining a consistent visual style.",
            "Used Adobe After Effects to create animated and motion-based social media content.",
          ],
        },
      ],
    },

    education: {
      heading: "Education",
      degree: "Bachelor’s degree in Computer Engineering and Automation",
      university: "University of Damascus | 2020 – 2025",
      projectLabel: "Graduation Project:",
      projectName: "Hawan Platform – Taxi Booking System",
    },

    skills: {
      heading: "Skills & Tools",
      categories: [
        {
          title: "Front-End Development",
          skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Bootstrap", "Responsive Web Design"],
        },
        {
          title: "React & Libraries",
          skills: ["React Router", "Context API", "React Query", "React Hook Form", "Recharts", "Axios", "Zod"],
        },
        { title: "APIs & Tools", skills: ["RESTful APIs", "Git & GitHub", "Leaflet Maps"] },
        { title: "Design", skills: ["Adobe Photoshop", "Adobe Illustrator", "Adobe After Effects"] },
      ],
    },

    design: {
      heading: "Graphic Design",
      intro: "A selection of my social media designs, carousels, and motion work.",
      filters: { all: "All", social: "Social media", carousel: "Carousels", motion: "Motion" },
      conceptLabel: "Concept",
      slidesLabel: (n) => `${n} slides`,
      videoLabel: "Video",
      open: (title) => `View ${title}`,
      close: "Close",
      prev: "Previous",
      next: "Next",
      counter: (i, n) => `${i} / ${n}`,
      behance: "View more on Behance",
    },

    courses: {
      heading: "Courses",
      items: [
        { title: "Front-End Development", provider: "Al-Baraka Association for Social Development" },
        { title: "Front-End Development", provider: "ClaudSoft Academy" },
        { title: "Graphic Design", provider: "Dr. Najeeb Al Mahairy" },
      ],
    },

    contact: {
      heading: "Contact",
      getInTouch: "Get in Touch",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send Message",
      infoHeading: "Contact Information",
      labels: { location: "Location", email: "Email", phone: "Phone", github: "Github", behance: "Behance" },
      location: "Syria - Damascus",
      mailSubject: (name) => `Portfolio message from ${name}`,
    },
  },

  ar: {
    brand: "هيا الحج",

    nav: {
      about: "من أنا",
      work: "أعمالي",
      design: "التصاميم",
      experience: "الخبرة",
      skills: "المهارات",
      courses: "الدورات",
      contact: "تواصل معي",
      resume: "السيرة الذاتية",
      mainLabel: "القائمة الرئيسية",
      openMenu: "فتح القائمة",
      closeMenu: "إغلاق القائمة",
      switchToDark: "التبديل إلى الوضع الليلي",
      switchToLight: "التبديل إلى الوضع النهاري",
      otherLanguage: "EN",
      switchLanguage: "تغيير اللغة إلى الإنجليزية",
    },

    hero: {
      greeting: "مرحباً، أنا",
      name: "هيا الحج",
      roles: ["مطوّرة واجهات أمامية مبتدئة", "مصمّمة جرافيك مبتدئة"],
      separator: "، ",
      description:
        "أصمّم محتوى إبداعياً لمنصات التواصل الاجتماعي، وأبني مواقع ويب متجاوبة وديناميكية، مع التركيز على التصميم العصري وتجربة مستخدم رائعة.",
      viewWork: "شاهد أعمالي",
      letsWork: "لنعمل معاً",
      imageAlt: "رسم توضيحي لهيا الحج",
    },

    about: {
      title: "من أنا",
      subtitle: "هندسة الأتمتة والحواسيب | خريجة",
      p1: "أنا خريجة هندسة الأتمتة والحواسيب، وشغوفة بتطوير الواجهات الأمامية والتصميم الجرافيكي. أبني مواقع ويب متجاوبة وديناميكية باستخدام تقنيات الويب الحديثة، وأصمّم كذلك محتوى إبداعياً وجذاباً لوسائل التواصل الاجتماعي.",
      p2: "أستمتع بالجمع بين التقنية والإبداع لتحويل الأفكار إلى تجارب رقمية نظيفة وعملية وجذابة بصرياً. وأسعى دائماً إلى التعلّم وتطوير مهاراتي وخوض تحديات جديدة.",
    },

    projects: {
      heading: "المشاريع",
      roleLabel: "دوري:",
      roleValue: "مطوّرة واجهات أمامية، تصميم الواجهات وتنفيذها",
      toolsLabel: "الأدوات:",
      viewDetails: "عرض التفاصيل",
      viewDetailsOf: (title) => `عرض تفاصيل ${title}`,
      details: {
        back: "العودة إلى المشاريع",
        overview: "نظرة عامة",
        featuresHeading: "أبرز الميزات",
        video: "شرح بالفيديو",
        videoTitle: (title) => `شرح بالفيديو لـ ${title}`,
        screenshots: "لقطات الشاشة",
        github: "عرض الكود على GitHub",
        live: "التجربة المباشرة",
        features: {
          muamalati: [
            "لوحات تحكم حسب الصلاحيات للموظفين ومديري الأقسام والمسؤولين",
            "تتبّع الحضور",
            "إدارة المعاملات",
            "مسارات الموافقات",
            "الإشعارات",
          ],
          hawan: [
            "صفحات هبوط وتسجيل دخول وإنشاء حساب متجاوبة",
            "اختيار الموقع باستخدام خرائط Leaflet",
            "واجهات مخصصة للركاب وأخرى للسائقين",
            "واجهات لتتبّع حالة الرحلة",
          ],
        },
      },
      items: [
        {
          title: "منصة معاملاتي",
          subtitle: "نظام إدارة المعاملات",
          imageAlt: "لقطة شاشة للوحة تحكم منصة معاملاتي",
          description:
            "معاملاتي نظام داخلي لإدارة معاملات الموظفين. قمت ببناء الواجهة الأمامية كاملة مع لوحات تحكم حسب الصلاحيات للموظفين ومديري الأقسام والمسؤولين، تشمل تتبّع الحضور والمعاملات والموافقات والإشعارات.",
        },
        {
          title: "منصة هوان",
          subtitle: "نظام حجز سيارات الأجرة",
          imageAlt: "لقطة شاشة لمنصة هوان لحجز سيارات الأجرة",
          description:
            "هوان نظام لحجز سيارات الأجرة. قمت ببناء الواجهة الأمامية كاملة، مع صفحات هبوط وتسجيل دخول وإنشاء حساب متجاوبة، ودمجت خرائط Leaflet لاختيار المواقع، وطوّرت واجهات مخصصة للركاب والسائقين وواجهات لتتبّع حالة الرحلة.",
        },
        {
          title: "Emotion in Motion",
          subtitle: "موقع تفاعلي",
          imageAlt: "لقطة شاشة لموقع Emotion in Motion",
          description:
            "Emotion in Motion موقع تفاعلي يستكشف كيف تعبّر الرموز التعبيرية (الإيموجي) عن المشاعر في العالم الرقمي. كان تركيزي الأساسي على تقديم تجربة جذابة بصرياً ومتجاوبة، مع تنظيم المشروع في مكوّنات قابلة لإعادة الاستخدام.",
        },
      ],
    },

    experience: {
      heading: "الخبرة",
      items: [
        {
          title: "أخصائية حملات Google Ads (عمل حر)",
          company: "عمل حر لصالح شركة برمجيات في الإمارات",
          period: "4 أكتوبر 2026 – الآن",
          points: [
            "توليت إدارة حملات Google Ads القائمة لعملاء في الكويت، ومراجعة أدائها وتعديلها لتحسين النتائج.",
            "أنشأت وأطلقت إعلانات جديدة على Google Ads للعملاء.",
            "تواصلت مباشرة مع العملاء لفهم احتياجاتهم ومشاركتهم التحديثات وتطبيق ملاحظاتهم.",
          ],
        },
        {
          title: "متطوعة",
          company: "جمعية التميز في كفالة اليتيم",
          period: "16 سبتمبر 2026 – الآن",
          points: [
            "شاركت في أنشطة تطوعية لدعم الأيتام، مثل توزيع الملابس والمستلزمات.",
            "قدّمت دعماً تقنياً تطوعياً للجمعية.",
          ],
        },
        {
          title: "متدرّبة تطوير واجهات أمامية",
          company: "Codveda Technology",
          period: "17 أغسطس 2026 – 17 سبتمبر 2026 | عن بُعد",
          points: [
            "أكملت تدريباً في تطوير الواجهات الأمامية من ثلاثة مستويات، ركّز على JavaScript وReact وواجهات REST API وتحسين الأداء وتطوير واجهات المستخدم الحديثة.",
            "طوّرت تطبيق طقس متجاوباً باستخدام React، مع التكامل مع REST API وجلب البيانات ديناميكياً وميزة البحث وعرض البيانات المعتمد على الـ API.",
            "حسّنت أداء الويب وطوّرت حركات تفاعلية باستخدام Framer Motion لتقديم تجارب مستخدم سلسة وسريعة الاستجابة.",
          ],
        },
        {
          title: "مصمّمة جرافيك",
          company: "Elegant Touch، عيادة تجميل، الإمارات",
          period: "يوليو 2026 – أغسطس 2026",
          points: [
            "صمّمت منشورات إنستغرام ومحتوى إبداعياً لوسائل التواصل الاجتماعي للعيادة.",
            "أنشأت تصاميم مرئية باستخدام Adobe Photoshop وAdobe Illustrator مع الحفاظ على هوية بصرية متسقة.",
            "استخدمت Adobe After Effects لإنشاء محتوى متحرك لوسائل التواصل الاجتماعي.",
          ],
        },
      ],
    },

    education: {
      heading: "التعليم",
      degree: "بكالوريوس في هندسة الحواسيب والأتمتة",
      university: "جامعة دمشق | 2020 – 2025",
      projectLabel: "مشروع التخرّج:",
      projectName: "منصة هوان – نظام حجز سيارات الأجرة",
    },

    skills: {
      heading: "المهارات والأدوات",
      categories: [
        {
          title: "تطوير الواجهات الأمامية",
          skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Bootstrap", "تصميم الويب المتجاوب"],
        },
        {
          title: "React والمكتبات",
          skills: ["React Router", "Context API", "React Query", "React Hook Form", "Recharts", "Axios", "Zod"],
        },
        { title: "واجهات البرمجة والأدوات", skills: ["RESTful APIs", "Git & GitHub", "Leaflet Maps"] },
        { title: "التصميم", skills: ["Adobe Photoshop", "Adobe Illustrator", "Adobe After Effects"] },
      ],
    },

    design: {
      heading: "التصميم الجرافيكي",
      intro: "مختارات من تصاميم وسائل التواصل الاجتماعي والكاروسيل وأعمال الموشن.",
      filters: { all: "الكل", social: "وسائل التواصل", carousel: "كاروسيل", motion: "موشن" },
      conceptLabel: "تصميم تجريبي",
      slidesLabel: (n) => `${n} شرائح`,
      videoLabel: "فيديو",
      open: (title) => `عرض ${title}`,
      close: "إغلاق",
      prev: "السابق",
      next: "التالي",
      counter: (i, n) => `${i} / ${n}`,
      behance: "المزيد على Behance",
    },

    courses: {
      heading: "الدورات",
      items: [
        { title: "تطوير الواجهات الأمامية", provider: "جمعية البركة للتنمية الاجتماعية" },
        { title: "تطوير الواجهات الأمامية", provider: "أكاديمية ClaudSoft" },
        { title: "التصميم الجرافيكي", provider: "د. نجيب المحايري" },
      ],
    },

    contact: {
      heading: "تواصل معي",
      getInTouch: "راسلني",
      name: "الاسم",
      email: "البريد الإلكتروني",
      message: "الرسالة",
      send: "إرسال الرسالة",
      infoHeading: "معلومات التواصل",
      labels: { location: "الموقع", email: "البريد الإلكتروني", phone: "الهاتف", github: "Github", behance: "Behance" },
      location: "سوريا - دمشق",
      mailSubject: (name) => `رسالة من البورتفوليو - ${name}`,
    },
  },
};