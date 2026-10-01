(function () {
  const D = window.N1;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const brl = v => 'R$ ' + v.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const pct = v => v.toFixed(1).replace('.', ',') + '%';
  const mil = v => 'R$ ' + Math.round(v / 1000).toLocaleString('pt-BR') + ' mil';
  let owner = false;

  /* ---------- CARDÁPIO NO CELULAR ---------- */
  const tabs = $('#tabs'), list = $('#list'), scr = $('#scr');
  D.cats.forEach(c => {
    const b = document.createElement('button');
    b.textContent = c.nome; b.dataset.cat = c.id;
    b.onclick = () => { const s = $('#m-' + c.id); scr.scrollTo({ top: s.offsetTop - tabs.offsetHeight + 4, behavior: 'smooth' }); };
    tabs.appendChild(b);
  });

  function cardHTML(it) {
    const cmv = it.custo / it.preco * 100, mg = it.preco - it.custo;
    const eco = it.de ? `<s>${brl(it.de)}</s><span class="ec">economize ${brl(it.de - it.preco)}</span>` : '';
    const pp = it.pp ? `<span class="pp">${brl(it.preco / it.pp)} por pessoa</span>` : '';
    const own = `<span class="ownv" style="display:${owner ? 'block' : 'none'};font-size:11px;font-weight:800;color:${cmv > 33 ? '#b3261e' : '#0a8f3c'};margin-top:4px">CMV ${pct(cmv)} · margem ${brl(mg)}</span>`;
    return `<button class="card" data-id="${it.id}">
      <div class="tx">${it.ml ? '<span class="ml">MAIS VENDIDO</span>' : ''}${it.rank ? `<div class="rk">🔥 ${it.rank}</div>` : ''}${it.selo ? `<span class="sl">${it.selo}</span>` : ''}
        <div class="nm">${it.nome}</div><div class="ds">${it.desc}</div>
        ${it.tam ? `<div class="tm">${it.tam}</div>` : ''}
        <div class="pr"><b>${it.tam ? 'a partir de ' : ''}${brl(it.preco)}</b>${eco}${pp}</div>${own}</div>
      <div class="pic"><img src="assets/prod/${it.img}.jpg" alt="" decoding="async"></div></button>`;
  }
  function renderList() {
    list.innerHTML = D.cats.map(c => {
      const its = D.itens.filter(i => i.cat === c.id);
      return `<div class="msec" id="m-${c.id}" data-cat="${c.id}"><h5>${c.icon} ${c.nome}</h5><div class="hint">${its.length} ${its.length === 1 ? 'item' : 'itens'}</div>${its.map(cardHTML).join('')}</div>`;
    }).join('');
    $$('.card', list).forEach(b => b.onclick = () => openItem(b.dataset.id));
  }
  renderList();

  // aba ativa + texto "por que converte"
  const whyNow = $('#whyNow');
  let curCat = '';
  function spy() {
    const y = scr.scrollTop + tabs.offsetHeight + 30;
    let cur = D.cats[0].id;
    $$('.msec', list).forEach(s => { if (s.offsetTop <= y) cur = s.dataset.cat; });
    if (cur === curCat) return; curCat = cur;
    $$('button', tabs).forEach(b => b.classList.toggle('on', b.dataset.cat === cur));
    const on = $(`button[data-cat="${cur}"]`, tabs); if (on) tabs.scrollTo({ left: on.offsetLeft - 20, behavior: 'smooth' });
    whyNow.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 350, easing: 'ease-out' });
    whyNow.textContent = D.cats.find(c => c.id === cur).nota;
  }
  scr.addEventListener('scroll', spy, { passive: true }); spy();

  /* ---------- ITEM + COMPLEMENTOS ---------- */
  const sheet = $('#sheet'), pn = $('#pn');
  const cart = [];
  function openItem(id) {
    const it = D.itens.find(i => i.id === id);
    whyNow.textContent = (it.up||[]).includes('trio') ? 'Vira Trio por + R$ 13: burger avulso deixa R$ 24,87 de margem, o trio deixa R$ 32,11.' : (it.up||[]).length ? 'Complementos com preço de combo: o extra aparece na hora da decisão, não lá embaixo do cardápio.' : D.cats.find(c => c.id === it.cat).nota;
    const sel = new Set();
    const ups = (it.up || []).map(k => ({ k, ...D.extras[k] }));
    const draw = () => {
      let total = it.preco, custo = it.custo;
      ups.forEach(u => { if (sel.has(u.k)) { total += u.preco; custo += u.custo; } });
      pn.innerHTML = `<div class="hd"><img src="assets/prod/${it.img}.jpg" alt=""><button class="x" data-close>✕</button></div>
      <div class="bd"><h6>${it.nome}</h6><div class="d">${it.desc}</div>
      <div class="pv">${brl(it.preco)} ${it.de ? `<s style="color:#999;font-size:13px">${brl(it.de)}</s><span class="ec" style="font-size:12px;color:#0a8f3c;background:#e6f6ec;padding:2px 6px;border-radius:6px">economize ${brl(it.de - it.preco)}</span>` : ''}</div>
      ${ups.length ? `<div class="grp"><div class="gt">${it.up.includes('kit') ? 'Quem pediu, também levou <span>compre junto</span>' : 'Turbine seu pedido <span>preço de combo</span>'}</div>
      ${ups.map(u => `<div class="opt ${sel.has(u.k) ? 'on' : ''}" data-k="${u.k}"><span class="ck"></span><span class="on2">${u.nome}<small>avulso ${brl(u.de)} · aqui você economiza ${brl(u.de - u.preco)}</small></span><span class="pz">+ ${brl(u.preco)}</span></div>`).join('')}</div>` : ''}
      ${owner ? `<div style="margin-top:12px;font-size:12px;font-weight:800;color:#0a8f3c">Modo dono: CMV ${pct(custo / total * 100)} · margem ${brl(total - custo)}</div>` : ''}
      </div><div class="add"><button id="addB"><span>Adicionar</span><span>${brl(total)}</span></button></div>`;
      $$('.opt', pn).forEach(o => o.onclick = () => { sel.has(o.dataset.k) ? sel.delete(o.dataset.k) : sel.add(o.dataset.k); const st = pn.scrollTop; draw(); pn.scrollTop = st; });
      $('#addB', pn).onclick = () => { cart.push({ total, custo }); closeSheet(); drawCart(); };
      $$('[data-close]', pn).forEach(x => x.onclick = closeSheet);
    };
    draw(); sheet.classList.add('on'); pn.scrollTop = 0;
  }
  function closeSheet() { sheet.classList.remove('on'); }
  $('[data-close]', sheet).onclick = closeSheet;
  function drawCart() {
    const tb = $('#tb'); if (!cart.length) { tb.classList.remove('on'); return; }
    const t = cart.reduce((a, c) => a + c.total, 0), c = cart.reduce((a, x) => a + x.custo, 0);
    $('#tbq').textContent = cart.length; $('#tbv').textContent = brl(t);
    $('#tbo').innerHTML = owner ? `margem<b>${brl(t - c)}</b>` : '';
    $('#tbo').style.display = owner ? 'block' : 'none';
    $('#tbv').style.marginLeft = owner ? '10px' : 'auto';
    tb.classList.add('on');
    tb.animate([{ transform: 'scale(1.06)' }, { transform: 'none' }], { duration: 300 });
  }
  $('#tb').onclick = () => { cart.length = 0; drawCart(); };
  $('#sw').onclick = () => { owner = !owner; $('#sw').classList.toggle('on', owner); const st = scr.scrollTop; renderList(); scr.scrollTop = st; curCat = ''; spy(); drawCart(); };

  /* ---------- ESCADAS ---------- */
  const L = [
    { h: 'Pra 1 pessoa', s: 'bom · melhor · ótimo', ids: ['dupla', 'trio', 'triocp'], star: 'trio' },
    { h: 'Pra 2 pessoas', s: 'o #1 da marca na porta', ids: ['dois2', 'doiscocas', 'super'], star: 'dois2' },
    { h: 'Pra 3 ou mais', s: 'menor preço por pessoa', ids: ['combom2', 'combog', 'combogg'], star: 'combom2' }
  ];
  $('#ladders').innerHTML = L.map(l => `<div class="lad rv"><div class="h">${l.h}<small>${l.s}</small></div>${l.ids.map(id => {
    const it = D.itens.find(i => i.id === id); const cmv = it.custo / it.preco * 100;
    return `<div class="st ${id === l.star ? 'star' : ''}"><div class="a">${id === l.star ? '★ ' : ''}${it.nome}</div><div class="b num">${brl(it.preco)}</div>
    <div class="c"><span>CMV <b>${pct(cmv)}</b></span><span>margem <b>${brl(it.preco - it.custo)}</b></span>${it.de ? `<span class="g">economize ${brl(it.de - it.preco)}</span>` : ''}${it.pp ? `<span>${brl(it.preco / it.pp)}/pessoa</span>` : ''}</div></div>`;
  }).join('')}</div>`).join('');

  /* ---------- SIMULADOR ---------- */
  const sl = $('#sliders');
  sl.innerHTML = D.attach.map(a => `<div class="sl"><div class="t"><b>${a.nome}</b><span class="v num" id="v-${a.id}">${pct(a.meta)}</span></div>
    <div class="o">Hoje: ${pct(a.atual)} dos pedidos · oferta: ${a.oferta}</div>
    <input type="range" min="${a.atual}" max="40" step="0.1" value="${a.meta}" id="s-${a.id}" aria-label="${a.nome}">
    <div class="sc"><span>hoje ${pct(a.atual)}</span><span>40%</span></div></div>`).join('');
  function sim() {
    let dT = 0, dM = 0, dD = 0;
    D.attach.forEach(a => {
      const v = +$('#s-' + a.id).value; $('#v-' + a.id).textContent = pct(v);
      const d = (v - a.atual) / 100, desc = a.atual / 100 * (a.antes - a.preco);
      dT += d * a.preco - desc; dM += d * (a.preco - a.custo) - desc; dD += desc;
    });
    const P = D.base.pedidos;
    $('#rT').textContent = brl(D.base.ticket + dT);
    $('#rP').textContent = (dT >= 0 ? '+' : '') + pct(dT / D.base.ticket * 100);
    $('#rG').textContent = mil(dT * P);
    $('#rM').textContent = mil(dM * P);
    $('#rD').textContent = '- ' + mil(dD * P);
    $('#rU').textContent = brl(dM);
  }
  $$('[data-cen]').forEach(b => b.onclick = () => {
    $$('[data-cen]').forEach(x => x.classList.toggle('on', x === b));
    D.attach.forEach(a => { const i = $('#s-' + a.id); i.value = b.dataset.cen === 'piso' ? a.atual * 1.5 : b.dataset.cen === 'teto' ? a.meta * 1.5 : a.meta; });
    sim();
  });
  $$('input[type=range]', sl).forEach(i => i.oninput = sim); sim();

  /* ---------- REVELAR / CONTADORES / PARALLAX ---------- */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; e.target.classList.add('in'); io.unobserve(e.target);
    const c = e.target.querySelector('[data-count]'); if (c) count(c);
  }), { threshold: .2 });
  $$('.rv,.leak').forEach((el, i) => { el.style.transitionDelay = (i % 3) * 90 + 'ms'; io.observe(el); });
  function count(el) {
    const to = +el.dataset.count, dec = +(el.dataset.dec || 0), suf = el.dataset.suf || '';
    const t0 = performance.now();
    const f = t => { const p = Math.min(1, (t - t0) / 1300), e = 1 - Math.pow(1 - p, 3);
      el.textContent = (to * e).toLocaleString('pt-BR', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf;
      if (p < 1) requestAnimationFrame(f); };
    requestAnimationFrame(f);
  }
  const nav = $('#nav'), sticks = $$('.stick');
  let mx = 0, my = 0;
  addEventListener('mousemove', e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; }, { passive: true });
  function loop() {
    try {
      const y = scrollY;
      sticks.forEach(s => { const p = +s.dataset.p; s.style.transform = `translate(${mx * p}px,${my * p - y * p / 60}px)`; });
      nav.classList.toggle('solid', y > 40);
    } catch (e) { }
    requestAnimationFrame(loop);
  }
  loop();

  /* ---------- MODO APRESENTAÇÃO ---------- */
  const stops = $$('.stop');
  const links = $$('.nav .links a');
  function idx() { let i = 0; stops.forEach((s, k) => { if (s.getBoundingClientRect().top <= 120 || (s.dataset.go && s.querySelector(s.dataset.go).getBoundingClientRect().top <= 140)) i = k; }); return i; }
  function go(i, smooth) { i = Math.max(0, Math.min(stops.length - 1, i)); const s = stops[i], t = s.dataset.go ? s.querySelector(s.dataset.go) : s; window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - (i ? (s.dataset.go ? 84 : 64) : 0), behavior: smooth ? 'smooth' : 'auto' }); }
  addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT') return;
    if (['ArrowDown', 'PageDown'].includes(e.key)) { e.preventDefault(); go(idx() + 1, true); }
    if (['ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); go(idx() - 1, true); }
    if (e.key === 'Home') { e.preventDefault(); go(0, true); }
  });
  addEventListener('scroll', () => { const i = idx(), id = stops[i].id; links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + id)); }, { passive: true });
  window.__site = { stops: stops.length, ready: false, go: i => go(i, false), next: d => go(idx() + d, true) };
  Promise.all([document.fonts ? document.fonts.ready : 0, ...$$('img').map(im => im.decode ? im.decode().catch(() => { }) : 0)]).then(() => window.__site.ready = true);
})();
