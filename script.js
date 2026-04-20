/* ═══════════════════════════════════════════════════
   SUZHOU GARDEN TOUR — Main Script
   ═══════════════════════════════════════════════════
   Sections:
   1. Navigation toggle (hamburger menu)
   2. Scroll fade-in animation (IntersectionObserver)
   3. Garden data + page rendering  (garden.html)
   4. Article data + page rendering (article.html)
   ═══════════════════════════════════════════════════ */


/* ─────────────────────────────────────────────────────
   1. Navigation Toggle
   ───────────────────────────────────────────────────── */
(function () {
  const toggle  = document.getElementById('navToggle');
  const overlay = document.getElementById('navOverlay');
  if (!toggle || !overlay) return;

  toggle.addEventListener('click', function () {
    const isOpen = overlay.classList.toggle('is-open');
    toggle.innerHTML = isOpen ? '&#10005;' : '&#9776;';   /* ✕ or ☰ */
    toggle.setAttribute('aria-expanded', isOpen);
  });

  /* Close the overlay when any link inside it is clicked */
  overlay.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      overlay.classList.remove('is-open');
      toggle.innerHTML = '&#9776;';
    });
  });
})();


/* ─────────────────────────────────────────────────────
   2. Scroll Fade-In (IntersectionObserver)
   ───────────────────────────────────────────────────── */
(function () {
  var els = document.querySelectorAll('.fade-in');
  if (!els.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        /* Stagger each element by 80ms so they don't all appear at once */
        setTimeout(function () {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(function (el) { observer.observe(el); });
})();


/* ─────────────────────────────────────────────────────
   3. Garden Page — data + rendering
      Only runs when garden.html has <div id="gardenContent">
   ───────────────────────────────────────────────────── */
(function () {
  var root = document.getElementById('gardenContent');
  if (!root) return;

  /* --- Garden data ---------------------------------- */
  var gardens = {
    'humble-administrator': {
      name:        "Humble Administrator's Garden",
      chineseName: '拙政园',
      description: "The largest and most renowned of Suzhou's classical gardens",
      hero:        'https://images.unsplash.com/photo-1775486315462-62ea39e31818?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
      history:     'Built in 1509 during the Ming Dynasty by Wang Xianchen, a dismissed imperial envoy. The name derives from a line in a classical text: "To plant trees and vegetables and sell them… this is the politics of a humble man."',
      philosophy:  'The garden embodies the Taoist principle of harmony between humans and nature. Water occupies one-third of the space, creating a sense of openness rare in Suzhou gardens. The design emphasizes borrowed scenery and changing perspectives.',
      sections: [
        {
          title: 'Eastern Garden',
          image: 'https://images.unsplash.com/photo-1775486335300-046f3a40c609?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
          text:  'Originally a separate property, the Eastern Garden features densely planted vegetation and intimate courtyards. The Hall of Celestial Spring showcases the interplay of architecture and natural elements.'
        },
        {
          title: 'Central Garden',
          image: 'https://images.unsplash.com/photo-1775486003441-490b76fd6a90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
          text:  'The heart of the garden centers on a large pond. Pavilions, bridges, and covered walkways frame ever-changing views. Each season brings new beauty—lotus in summer, falling leaves in autumn.'
        },
        {
          title: 'Western Garden',
          image: 'https://images.unsplash.com/photo-1775485250998-3f96ea43b07c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
          text:  'Added in the late Qing Dynasty, this section creates a more intimate atmosphere with smaller ponds and rocky landscapes. The 36 Pairs of Mandarin Ducks Hall exemplifies refined Ming architecture.'
        }
      ]
    },

    'lingering-garden': {
      name:        'Lingering Garden',
      chineseName: '留园',
      description: 'A masterwork of spatial composition and artistic rock arrangement',
      hero:        'https://images.unsplash.com/photo-1773735968697-a23f930e0228?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
      history:     'Created during the Ming Dynasty in 1593, the Lingering Garden underwent major renovation in the Qing Dynasty. It represents the peak of Chinese private garden art.',
      philosophy:  'The garden demonstrates the principle of "small spaces containing great scenery." Through careful arrangement of architecture, rocks, water, and plants, it creates a sense of infinite depth within limited space.',
      sections: [
        {
          title: 'Rock Compositions',
          image: 'https://images.unsplash.com/photo-1703162513864-ccd2e060875f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
          text:  "The garden houses some of China's most prized rocks, including the 6.5-meter Crown Cloud Peak. These Taihu stones are valued for their wrinkled, perforated, and slender forms."
        },
        {
          title: 'Covered Walkways',
          image: 'https://images.unsplash.com/photo-1775486003441-490b76fd6a90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
          text:  'Over 700 meters of covered corridors connect different garden areas while framing views through latticed windows. Each window opening presents a living painting.'
        },
        {
          title: 'Architectural Details',
          image: 'https://images.unsplash.com/photo-1775486075949-ece9554d42e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
          text:  'Halls feature exquisite woodwork, carved doors, and calligraphic inscriptions. The interplay of interior and exterior spaces creates a rhythm of revelation and concealment.'
        }
      ]
    },

    'master-of-nets': {
      name:        'Master of the Nets Garden',
      chineseName: '网师园',
      description: "The epitome of the scholar's garden aesthetic",
      hero:        'https://images.unsplash.com/photo-1700224732905-64673adc26e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
      history:     'Originally built in 1140, rebuilt in 1770. Despite being one of the smallest classical gardens, it is considered the most refined example of residential garden design.',
      philosophy:  "The garden embodies the scholar's ideal of cultured retirement. Every element serves contemplation—from the placement of a single rock to the reflection of moonlight on water.",
      sections: [
        {
          title: 'Main Residence',
          image: 'https://images.unsplash.com/photo-1754119050531-cad72e8b3a34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
          text:  'The residential quarters showcase refined literati taste through understated elegance. Furniture, paintings, and decorative objects create an atmosphere of cultured simplicity.'
        },
        {
          title: 'Central Pond',
          image: 'https://images.unsplash.com/photo-1639003332541-eacb9d96c14f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
          text:  'Though modest in size, the pond creates a sense of expansiveness through strategic viewing angles. Pavilions positioned at key points maximize scenic variety.'
        },
        {
          title: 'Moon Viewing',
          image: 'https://images.unsplash.com/photo-1689825650048-55d2216868f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
          text:  'The garden was designed with nocturnal appreciation in mind. The Pavilion for Watching the Moon demonstrates how architecture frames celestial beauty.'
        }
      ]
    }
  };

  /* --- Determine which garden to show -------------- */
  var params = new URLSearchParams(window.location.search);
  var id     = params.get('id') || 'humble-administrator';
  var g      = gardens[id];

  if (!g) {
    root.innerHTML = '<p style="padding:4rem;text-align:center;">Garden not found.</p>';
    return;
  }

  document.title = g.name + ' — Suzhou Tour Guide';

  /* --- Build alternating section HTML -------------- */
  var sectionsHTML = g.sections.map(function (s, i) {
    var isReverse = (i % 2 === 1);
    var bgClass   = isReverse ? 'section--white' : '';
    var gridMod   = isReverse ? ' gd-grid--reverse' : '';

    return '<div class="gd-section ' + bgClass + '">' +
      '<div class="gd-grid' + gridMod + ' container">' +
        '<div class="gd-img-wrap fade-in">' +
          '<img src="' + s.image + '" alt="' + s.title + '" class="gd-img">' +
        '</div>' +
        '<div class="gd-text-wrap fade-in">' +
          '<h3 class="gd-title">' + s.title + '</h3>' +
          '<p class="gd-text">' + s.text + '</p>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');

  /* --- Inject all HTML into the page --------------- */
  root.innerHTML =
    /* Hero */
    '<section class="hero hero--mid">' +
      '<div class="hero-bg">' +
        '<img src="' + g.hero + '" alt="' + g.name + '">' +
        '<div class="hero-overlay"></div>' +
      '</div>' +
      '<div class="hero-content">' +
        '<div class="container">' +
          '<div class="hero-text">' +
            '<p class="hero-kicker">Classical Garden</p>' +
            '<h1 class="hero-title">' + g.name + '</h1>' +
            '<p class="hero-subtitle hero-subtitle--serif">' + g.chineseName + '</p>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</section>' +

    /* Introduction */
    '<section class="section section--white">' +
      '<div class="container container--narrow">' +
        '<h2 class="intro-title fade-in">' + g.description + '</h2>' +
        '<div class="intro-block fade-in">' +
          '<p class="intro-block-label">History</p>' +
          '<p class="intro-text">' + g.history + '</p>' +
        '</div>' +
        '<div class="intro-block fade-in">' +
          '<p class="intro-block-label">Design Philosophy</p>' +
          '<p class="intro-text">' + g.philosophy + '</p>' +
        '</div>' +
      '</div>' +
    '</section>' +

    /* Alternating sections */
    sectionsHTML;

  /* Re-run the fade-in observer for freshly injected elements */
  var newEls = root.querySelectorAll('.fade-in');
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function () { entry.target.classList.add('visible'); }, i * 80);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  newEls.forEach(function (el) { obs.observe(el); });
})();


/* ─────────────────────────────────────────────────────
   4. Article Page — data + rendering
      Only runs when article.html has <div id="articleContent">
   ───────────────────────────────────────────────────── */
(function () {
  var root = document.getElementById('articleContent');
  if (!root) return;

  /* --- Article data --------------------------------- */
  var articles = {
    'aesthetic-windows': {
      title:    'Aesthetic Value of Windows',
      subtitle: 'How geometric openings frame nature as living art',
      author:   'Li Mei',
      date:     'March 2026',
      readTime: '8 min read',
      hero:     'https://images.unsplash.com/photo-1770783806417-3014a0cb2460?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
      content: [
        { type: 'text',    text: 'In Suzhou classical gardens, windows serve far more than their utilitarian purpose. They are instruments of vision, frames through which nature becomes art, and the mundane transforms into the extraordinary.' },
        { type: 'text',    text: 'The Chinese term for these decorative openings, "lou chuang" (漏窗), translates roughly to "leaking windows"—suggesting their role in allowing glimpses, fragments, and selective revelations rather than complete vistas. This principle of partial concealment creates anticipation and rewards slow observation.' },
        { type: 'quote',   text: 'A window should not merely open to a view, but compose it as a painter composes a landscape.', attribution: 'Ji Cheng, The Craft of Gardens (1634)' },
        { type: 'image',   src: 'https://images.unsplash.com/photo-1773300768055-a1e209f09db0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200', caption: 'Circular moon gate framing a contemplative garden scene' },
        { type: 'heading', text: 'Geometric Language' },
        { type: 'text',    text: 'The shapes themselves carry meaning. Circular openings—"moon gates"—suggest completeness and heaven. Octagonal windows reference the eight trigrams of Taoist cosmology. Fan-shaped and vase-shaped openings evoke scholarly pursuits and refinement.' },
        { type: 'text',    text: 'These geometric forms are never arbitrary. Each shape interacts with its surrounding architecture and the view it frames. A circular opening might frame a gnarled pine branch in such a way that the tree appears to grow from the geometry itself.' },
        { type: 'heading', text: 'Temporal Frames' },
        { type: 'text',    text: 'Windows in classical gardens acknowledge the fourth dimension: time. As light changes throughout the day, the same opening presents different compositions. Morning sun might illuminate distant foliage while casting deep shadows on near rocks.' },
        { type: 'quote',   text: 'The best gardens are never finished, but continually paint themselves anew with each passing season.' },
        { type: 'heading', text: 'Philosophy in Form' },
        { type: 'text',    text: 'Ultimately, the aesthetic value of windows in Suzhou gardens reflects deeper philosophical principles. The Taoist concept of wu wei (無為)—effortless action—finds expression in how these openings seem to naturally frame beauty without force or contrivance.' },
        { type: 'text',    text: "In this way, Suzhou's decorative windows are not mere architectural ornament but tools for cultivating attention, exercises in mindful observation, and reminders that how we frame the world determines what we see." }
      ]
    },

    'rock-arrangement': {
      title:    'The Art of Rock Arrangement',
      subtitle: 'Taihu stones and the pursuit of natural artifice',
      author:   'Zhang Wei',
      date:     'April 2026',
      readTime: '10 min read',
      hero:     'https://images.unsplash.com/photo-1703162513864-ccd2e060875f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
      content: [
        { type: 'text',    text: 'To Western eyes, the elaborate rock arrangements in Suzhou gardens might appear chaotic or haphazard. To understand their profound artistry requires appreciating a different aesthetic—one that values the suggestions of nature over literal representation.' },
        { type: 'quote',   text: 'The stone that appears most natural required the greatest artifice to position.' },
        { type: 'text',    text: 'The prized Taihu stones (太湖石) from Lake Tai embody the ideal qualities: shou (thin and upright), zhou (wrinkled texture), lou (perforated with holes), and tou (translucent in places). These weathered limestone rocks, shaped by water over centuries, suggest mountains, mythical creatures, and scholars in contemplation.' },
        { type: 'image',   src: 'https://images.unsplash.com/photo-1775486003441-490b76fd6a90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200', caption: 'Carefully composed rock formations create miniature mountain landscapes' },
        { type: 'heading', text: 'Miniature Mountains' },
        { type: 'text',    text: 'Chinese gardens compress vast landscapes into intimate spaces. Rock arrangements serve as "false mountains" (假山, jia shan), allowing scholars to experience mountain contemplation without leaving the city.' },
        { type: 'text',    text: 'The art lies not in fooling the eye but in creating what landscape theorist Ji Cheng called "artful simplicity"—arrangements that appear inevitable yet required painstaking effort to achieve.' }
      ]
    },

    'borrowed-scenery': {
      title:    'Borrowed Scenery in Garden Design',
      subtitle: 'Extending boundaries through visual incorporation',
      author:   'Wang Xiuying',
      date:     'April 2026',
      readTime: '7 min read',
      hero:     'https://images.unsplash.com/photo-1775486075949-ece9554d42e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
      content: [
        { type: 'text',    text: 'The technique of "borrowed scenery" (借景, jie jing) represents one of classical Chinese garden design\'s most sophisticated concepts. By incorporating distant views—pagodas, mountains, even clouds—into the garden\'s composition, designers expand limited space into infinite possibility.' },
        { type: 'quote',   text: 'The borrowed view belongs to no one and to everyone. It cannot be owned, only appreciated.' },
        { type: 'text',    text: 'This practice emerged from practical necessity. Urban gardens in Suzhou rarely exceeded a few acres. To create a sense of vastness, designers learned to "borrow" elements beyond their walls, carefully positioning buildings and planting trees to frame distant features as if they were part of the garden itself.' },
        { type: 'image',   src: 'https://images.unsplash.com/photo-1775485250998-3f96ea43b07c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200', caption: 'Garden elements frame both near and distant scenery in harmonious composition' },
        { type: 'heading', text: 'Levels of Borrowing' },
        { type: 'text',    text: 'Classical garden theory identifies several types of borrowed scenery: distant borrowing (using far mountains or towers), near borrowing (incorporating neighboring trees), upward borrowing (framing clouds or moon), and temporal borrowing (designing for seasonal or daily changes in light).' },
        { type: 'text',    text: 'Modern urban development has complicated this ancient practice. Skyscrapers now loom where pagodas once stood. Yet the principle remains valuable: the best design recognizes that boundaries are perceptual rather than absolute.' }
      ]
    }
  };

  /* --- Determine which article to show ------------- */
  var params  = new URLSearchParams(window.location.search);
  var id      = params.get('id') || 'aesthetic-windows';
  var article = articles[id];

  if (!article) {
    root.innerHTML = '<p style="padding:4rem;text-align:center;">Article not found.</p>';
    return;
  }

  document.title = article.title + ' — Suzhou Tour Guide';

  /* --- Render each content block ------------------- */
  var bodyHTML = article.content.map(function (block) {
    switch (block.type) {
      case 'text':
        return '<p>' + block.text + '</p>';

      case 'heading':
        return '<h2>' + block.text + '</h2>';

      case 'quote':
        return '<blockquote class="article-blockquote">' +
          '<p>' + block.text + '</p>' +
          (block.attribution ? '<cite>— ' + block.attribution + '</cite>' : '') +
        '</blockquote>';

      case 'image':
        return '<figure class="article-figure">' +
          '<img src="' + block.src + '" alt="' + (block.caption || '') + '">' +
          (block.caption ? '<figcaption class="article-figcaption">' + block.caption + '</figcaption>' : '') +
        '</figure>';

      default:
        return '';
    }
  }).join('');

  /* --- Build "Continue Reading" links -------------- */
  var relatedHTML = Object.keys(articles)
    .filter(function (key) { return key !== id; })
    .slice(0, 2)
    .map(function (key) {
      var a = articles[key];
      return '<a href="article.html?id=' + key + '" class="continue-item">' +
        '<h4 class="continue-item-title">' + a.title + '</h4>' +
        '<p class="continue-item-sub">' + a.subtitle + '</p>' +
      '</a>';
    }).join('');

  /* --- Inject all HTML into the page --------------- */
  root.innerHTML =
    /* Article header */
    '<header class="article-header">' +
      '<div class="container container--narrow">' +
        '<a href="index.html" class="article-back">&#8592; Back to Home</a>' +
        '<p class="article-kicker">Column Article</p>' +
        '<h1 class="article-title">' + article.title + '</h1>' +
        '<p class="article-subtitle">' + article.subtitle + '</p>' +
        '<div class="article-meta">' +
          '<span>By ' + article.author + '</span>' +
          '<span>&bull;</span>' +
          '<span>' + article.date + '</span>' +
          '<span>&bull;</span>' +
          '<span>' + article.readTime + '</span>' +
        '</div>' +
      '</div>' +
    '</header>' +

    /* Hero image */
    '<img src="' + article.hero + '" alt="' + article.title + '" class="article-hero-img">' +

    /* Body */
    '<article class="article-body">' +
      '<div class="container container--narrow">' +
        bodyHTML +
      '</div>' +
    '</article>' +

    /* Continue reading */
    '<section class="continue-reading">' +
      '<div class="container container--narrow">' +
        '<p class="section-label">Continue Reading</p>' +
        '<div class="continue-grid">' + relatedHTML + '</div>' +
      '</div>' +
    '</section>';
})();
