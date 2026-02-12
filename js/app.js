(function () {
  const data = window.SITE_DATA;

  if (!data) {
    return;
  }

  const byId = (id) => document.getElementById(id);
  const formatDate = (dateText) =>
    new Intl.DateTimeFormat('en', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    }).format(new Date(dateText));

  function escapeHtml(value) {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function inlineMarkdown(text) {
    const escaped = escapeHtml(text);
    return escaped
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
  }

  function markdownToHtml(markdown) {
    const lines = markdown.split(/\r?\n/);
    const chunks = [];
    let paragraph = [];
    let inList = false;
    let inCode = false;
    let codeLines = [];

    const flushParagraph = () => {
      if (!paragraph.length) {
        return;
      }
      chunks.push(`<p>${inlineMarkdown(paragraph.join(' '))}</p>`);
      paragraph = [];
    };

    const closeList = () => {
      if (inList) {
        chunks.push('</ul>');
        inList = false;
      }
    };

    lines.forEach((line) => {
      if (line.startsWith('```')) {
        flushParagraph();
        closeList();
        if (inCode) {
          chunks.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
          inCode = false;
          codeLines = [];
        } else {
          inCode = true;
        }
        return;
      }

      if (inCode) {
        codeLines.push(line);
        return;
      }

      if (!line.trim()) {
        flushParagraph();
        closeList();
        return;
      }

      if (/^###\s+/.test(line)) {
        flushParagraph();
        closeList();
        chunks.push(`<h3>${inlineMarkdown(line.replace(/^###\s+/, ''))}</h3>`);
        return;
      }

      if (/^##\s+/.test(line)) {
        flushParagraph();
        closeList();
        chunks.push(`<h2>${inlineMarkdown(line.replace(/^##\s+/, ''))}</h2>`);
        return;
      }

      if (/^#\s+/.test(line)) {
        flushParagraph();
        closeList();
        chunks.push(`<h1>${inlineMarkdown(line.replace(/^#\s+/, ''))}</h1>`);
        return;
      }

      if (/^-\s+/.test(line)) {
        flushParagraph();
        if (!inList) {
          chunks.push('<ul>');
          inList = true;
        }
        chunks.push(`<li>${inlineMarkdown(line.replace(/^-\s+/, ''))}</li>`);
        return;
      }

      paragraph.push(line.trim());
    });

    flushParagraph();
    closeList();

    if (inCode) {
      chunks.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
    }

    return chunks.join('');
  }

  function parseFrontmatter(raw) {
    if (!raw.startsWith('---')) {
      return { meta: {}, content: raw };
    }

    const end = raw.indexOf('\n---', 3);
    if (end === -1) {
      return { meta: {}, content: raw };
    }

    const block = raw.slice(3, end).trim();
    const content = raw.slice(end + 4).trim();
    const meta = {};

    block.split(/\r?\n/).forEach((line) => {
      const [key, ...rest] = line.split(':');
      if (!key || !rest.length) {
        return;
      }
      const value = rest.join(':').trim();
      if (value.startsWith('[') && value.endsWith(']')) {
        meta[key.trim()] = value
          .slice(1, -1)
          .split(',')
          .map((item) => item.trim().replace(/^"|"$/g, ''))
          .filter(Boolean);
      } else {
        meta[key.trim()] = value.replace(/^"|"$/g, '');
      }
    });

    return { meta, content };
  }

  function renderHero() {
    const headline = byId('hero-headline');
    const subheadline = byId('hero-subheadline');

    headline.textContent = data.hero.headline;
    subheadline.textContent = data.hero.subheadline;

    const ctaWrap = byId('hero-ctas');
    const ctas = ctaWrap.querySelectorAll('a');
    ctas[1].setAttribute('href', data.hero.resumeUrl);
    ctas[2].setAttribute('href', data.hero.linkedinUrl);
    ctas[3].setAttribute('href', data.hero.linkedinUrl);
  }

  function renderImpact() {
    const wrap = byId('impact-grid');
    wrap.innerHTML = data.impactTiles
      .map(
        (tile) => `
          <article class="tile">
            <p class="metric">${escapeHtml(tile.metric)}</p>
            <p class="label">${escapeHtml(tile.label)}</p>
            <p class="meta">${escapeHtml(tile.note)}</p>
          </article>
        `
      )
      .join('');
  }

  function renderCaseStudies() {
    const cards = byId('case-grid');
    const details = byId('case-details');

    cards.innerHTML = data.caseStudies
      .map(
        (study) => `
          <article class="card" id="case-${study.id}">
            <h3>${escapeHtml(study.title)}</h3>
            <p><strong>Problem:</strong> ${escapeHtml(study.problem)}</p>
            <p><strong>Approach:</strong> ${escapeHtml(study.approach)}</p>
            <p><strong>Result:</strong> ${escapeHtml(study.result)}</p>
            <div class="tag-row">
              ${study.tools.map((tool) => `<span class="tag">${escapeHtml(tool)}</span>`).join('')}
            </div>
            <p class="small"><a href="#detail-${study.id}">Go to case detail</a></p>
          </article>
        `
      )
      .join('');

    details.innerHTML = data.caseStudies
      .map(
        (study) => `
          <section class="case-detail" id="detail-${study.id}">
            <h3>${escapeHtml(study.title)} - Detail</h3>
            <button class="toggle" type="button" aria-expanded="false" aria-controls="panel-${study.id}">
              Expand details
            </button>
            <div class="toggle-panel" id="panel-${study.id}" hidden>
              <ul>
                ${study.detail.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
              </ul>
              <p class="small"><strong>Metrics:</strong> ${study.metrics.map((metric) => escapeHtml(metric)).join(' | ')}</p>
              <p class="small"><strong>Tools:</strong> ${study.tools.map((tool) => escapeHtml(tool)).join(', ')}</p>
            </div>
          </section>
        `
      )
      .join('');

    details.querySelectorAll('.toggle').forEach((button) => {
      button.addEventListener('click', () => {
        const panelId = button.getAttribute('aria-controls');
        const panel = byId(panelId);
        const expanded = button.getAttribute('aria-expanded') === 'true';

        button.setAttribute('aria-expanded', String(!expanded));
        button.textContent = expanded ? 'Expand details' : 'Collapse details';
        panel.hidden = expanded;
      });
    });
  }

  function renderSkills() {
    const skillGroups = [
      { title: 'Core Analytics', items: data.skills.coreAnalytics },
      { title: 'BI / Data', items: data.skills.biData },
      { title: 'Methods', items: data.skills.methods }
    ];

    byId('skills-grid').innerHTML = skillGroups
      .map(
        (group) => `
          <article class="skill-group">
            <h3>${escapeHtml(group.title)}</h3>
            <ul>
              ${group.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
            </ul>
          </article>
        `
      )
      .join('');
  }

  function renderExperience() {
    byId('experience-list').innerHTML = data.experience
      .map(
        (role) => `
          <article class="role">
            <h3>${escapeHtml(role.role)} | ${escapeHtml(role.company)}</h3>
            <p class="meta">${escapeHtml(role.period)}</p>
            <ul>
              ${role.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('')}
            </ul>
          </article>
        `
      )
      .join('');
  }

  function renderCertifications() {
    byId('cert-list').innerHTML = data.certifications
      .map((cert) => {
        const tail = cert.year ? ` | ${cert.year}` : '';
        return `<li><strong>${escapeHtml(cert.name)}</strong><br><span class="meta">${escapeHtml(cert.issuer)}${escapeHtml(tail)}</span></li>`;
      })
      .join('');
  }

  function getPostsSorted() {
    return [...data.writing.posts].sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  function renderWritingCards() {
    const posts = getPostsSorted().slice(0, 3);
    byId('writing-list').innerHTML = posts
      .map(
        (post) => `
          <article class="card">
            <h3><a href="#/post/${post.slug}">${escapeHtml(post.title)}</a></h3>
            <p class="meta">${formatDate(post.date)} | ${escapeHtml(post.tags.join(', '))}</p>
            <p>${escapeHtml(post.description)}</p>
            <a class="btn btn-ghost" href="#/post/${post.slug}">Read post</a>
          </article>
        `
      )
      .join('');
  }

  async function renderPost(slug) {
    const postMeta = data.writing.posts.find((post) => post.slug === slug);
    if (!postMeta) {
      return false;
    }

    try {
      const response = await fetch(postMeta.file, { cache: 'no-cache' });
      if (!response.ok) {
        throw new Error(`Unable to load post ${slug}`);
      }
      const raw = await response.text();
      const parsed = parseFrontmatter(raw);

      const title = parsed.meta.title || postMeta.title;
      const date = parsed.meta.date || postMeta.date;
      const tags = Array.isArray(parsed.meta.tags) && parsed.meta.tags.length ? parsed.meta.tags : postMeta.tags;
      const description = parsed.meta.description || postMeta.description;

      byId('post-content').innerHTML = `
        <header class="post-header">
          <h2>${escapeHtml(title)}</h2>
          <p class="meta">${formatDate(date)} | ${escapeHtml(tags.join(', '))}</p>
          <p>${escapeHtml(description)}</p>
        </header>
        <div class="post-body">${markdownToHtml(parsed.content)}</div>
      `;

      byId('post-view').hidden = false;
      return true;
    } catch (err) {
      byId('post-content').innerHTML = '<p>Unable to load this post right now.</p>';
      byId('post-view').hidden = false;
      return false;
    }
  }

  async function handleRoute() {
    const hash = window.location.hash || '';
    const match = hash.match(/^#\/post\/([a-z0-9-]+)$/i);

    if (!match) {
      byId('post-view').hidden = true;
      return;
    }

    await renderPost(match[1]);
  }

  function wireGlobalActions() {
    byId('close-post').addEventListener('click', () => {
      byId('post-view').hidden = true;
      window.location.hash = '#writing';
    });

    const footer = byId('footer-ctas').querySelectorAll('a');
    footer[0].setAttribute('href', data.footer.resumeUrl);
    footer[1].setAttribute('href', data.footer.linkedinUrl);

    const footerLine = document.querySelector('.footer-line');
    footerLine.textContent = data.footer.line;
  }

  function applySeo() {
    if (data.seo.title) {
      document.title = data.seo.title;
    }

    const description = document.querySelector('meta[name="description"]');
    if (description && data.seo.description) {
      description.setAttribute('content', data.seo.description);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical && data.seo.canonical) {
      canonical.setAttribute('href', data.seo.canonical);
    }
  }

  async function init() {
    applySeo();
    renderHero();
    renderImpact();
    renderCaseStudies();
    renderSkills();
    renderExperience();
    renderCertifications();
    renderWritingCards();
    wireGlobalActions();

    window.addEventListener('hashchange', handleRoute);
    await handleRoute();
  }

  init();
})();
