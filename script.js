const EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', ''];

function tryImage(img, basePath) {
  let i = 0;
  function next() {
    if (i >= EXTENSIONS.length) {
      img.style.display = 'none';
      return;
    }
    img.src = basePath + EXTENSIONS[i++];
  }
  img.onerror = next;
  next();
}

function productImageBase(product, type='01-main') {
  return `${product.category}/${product.asin}/${type}`;
}

function setLogos() {
  document.querySelectorAll('[data-logo]').forEach(img => {
    tryImage(img, `Logos/${img.dataset.logo}`);
  });
}

function setStaticProductImages() {
  document.querySelectorAll('[data-product-img]').forEach(img => {
    const product = PRODUCTS.find(p => p.asin === img.dataset.productImg);
    if (!product) return;
    tryImage(img, productImageBase(product, img.dataset.imgType || '01-main'));
  });
}

function renderProducts(filter='All') {
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  grid.innerHTML = '';

  PRODUCTS
    .filter(p => p.status === 'Active')
    .filter(p => filter === 'All' || p.category === filter)
    .forEach(product => {
      const card = document.createElement('article');
      card.className = 'product-card';

      const imageWrap = document.createElement('div');
      imageWrap.className = 'image-wrap';
      const img = document.createElement('img');
      img.alt = product.name;
      tryImage(img, productImageBase(product, '01-main'));
      imageWrap.appendChild(img);

      const meta = document.createElement('div');
      meta.className = 'product-meta';
      meta.textContent = `${product.brand} · ${product.category}`;

      const title = document.createElement('h3');
      title.textContent = product.name;

      const actions = document.createElement('div');
      actions.className = 'product-actions';

      const amazon = document.createElement('a');
      amazon.href = product.url;
      amazon.target = '_blank';
      amazon.rel = 'noopener noreferrer';
      amazon.textContent = 'View on Amazon';

      actions.appendChild(amazon);
      card.append(imageWrap, meta, title, actions);
      grid.appendChild(card);
    });
}

function setupFilters() {
  document.querySelectorAll('.filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProducts(btn.dataset.filter);
    });
  });

  document.querySelectorAll('[data-filter-link]').forEach(link => {
    link.addEventListener('click', () => {
      const filter = link.dataset.filterLink;
      setTimeout(() => {
        const btn = document.querySelector(`.filter[data-filter="${filter}"]`);
        if (btn) btn.click();
      }, 100);
    });
  });
}

function setupMenu() {
  const button = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav');
  if (!button || !nav) return;
  button.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}

setLogos();
setStaticProductImages();
renderProducts();
setupFilters();
setupMenu();
