// Fontes: preço e custo = planilha "CMV 2026 - NOVA OPERAÇÃO", aba "Precificação N1" (custo + embalagem).
// Ranking e attach = BI Tastefy (vps_fato.itens_pedidos e public.vendas_diarias), 30/08 a 28/09/2026, iFood.
window.N1 = {
  base: { pedidos: 52049, ticket: 61.16, gmv: 3183564.93, lojas: 75 },
  attach: [
    { id: 'bebida', nome: 'Bebida', atual: 5.3, meta: 12, preco: 9.90, antes: 11.90, custo: 3.64, oferta: 'Coca lata no combo por R$ 9,90' },
    { id: 'acomp', nome: 'Acompanhamento', atual: 5.6, meta: 15, preco: 9.90, antes: 11.80, custo: 2.02, oferta: 'Batata individual no combo por R$ 9,90' },
    { id: 'sobremesa', nome: 'Sobremesa', atual: 1.7, meta: 6, preco: 6.90, antes: 9.90, custo: 2.02, oferta: 'Brigadeiro no combo por R$ 6,90' },
    { id: 'molho', nome: 'Molho no potinho', atual: 3.9, meta: 12, preco: 5.90, antes: 6.49, custo: 1.87, oferta: 'Molho no combo por R$ 5,90' }
  ],
  // complementos oferecidos dentro do item (lógica de complementos do iFood)
  extras: {
    trio: { nome: 'Vira Trio: batata individual + Coca lata', preco: 13.00, custo: 5.34, de: 23.80 },
    trioCaixa: { nome: 'Vira Trio: purê + Coca lata', preco: 18.00, custo: 7.09, de: 26.80 },
    kit: { nome: 'Batata frita + Coca lata', preco: 14.90, custo: 5.66, de: 20.99 },
    batata: { nome: 'Batata frita individual', preco: 9.90, custo: 2.02, de: 11.90 },
    coca: { nome: 'Coca-Cola lata', preco: 9.90, custo: 3.64, de: 11.90 },
    molho: { nome: 'Molho no potinho (verde, alho, bacon, barbecue)', preco: 5.90, custo: 1.87, de: 8.90 },
    brig: { nome: 'Brigadeiro N1', preco: 6.90, custo: 2.02, de: 9.90 }
  },
  cats: [
    { id: 'top', nome: 'Mais pedidos', icon: '🔥', nota: 'Prova social com dado real: o ranking vem do BI, não de opinião.' },
    { id: 'solo', nome: 'Pra 1 pessoa', icon: '🙋', nota: 'O cliente começa pela ocasião. 4 escolhas pra quem pede sozinho.' },
    { id: 'dupla', nome: 'Pra 2 pessoas', icon: '👫', nota: 'O item mais vendido da marca vira a porta de entrada da dupla. Por + R$ 10 ele leva as 2 Cocas.' },
    { id: 'galera', nome: 'Pra 3 ou mais', icon: '🎉', nota: 'Preço por pessoa em cada card. O Combo GG de R$ 219,90 é a âncora de teto: faz o Combo M (R$ 26,63 por pessoa) parecer a escolha óbvia.' },
    { id: 'burgers', nome: 'Burgers', icon: '🍔', nota: 'Todo burger avulso oferece o Vira Trio por + R$ 13.' },
    { id: 'caixas', nome: 'Frango na caixa', icon: '🍗', nota: 'Porção escrita no card. Caixa P = 275 g de tiras (ficha técnica).' },
    { id: 'refeicoes', nome: 'Refeições', icon: '🍛', nota: 'O Executivo mostra a economia de R$ 15,80 contra os itens separados.' },
    { id: 'acomp', nome: 'Acompanhamentos', icon: '🍟', nota: 'Um card por produto, com os tamanhos dentro.' },
    { id: 'molhos', nome: 'Molhos', icon: '🥫', nota: 'Um card só, 7 sabores dentro. No combo sai por R$ 5,90.' },
    { id: 'doces', nome: 'Sobremesas e bebidas', icon: '🥤', nota: 'Coca normal e sem açúcar viram uma escolha dentro do mesmo item.' }
  ],
  itens: [
    // Mais pedidos: ranking real do BI (quantidade vendida em 30 dias)
    { id: 'dois', cat: 'top', nome: '2 Burguers com Desconto', img: 'dois-burgers', preco: 49.90, custo: 14.13, de: 63.80, rank: '+10 mil vendidos em 30 dias · 1º da N1', ml: true, desc: 'Dois burgers de frango frito crocante no pão brioche. Você escolhe os sabores.', up: ['kit', 'molho', 'brig'] },
    { id: 'combom', cat: 'top', nome: 'Combo M · 2 a 3 pessoas', img: 'combo-m', preco: 79.90, custo: 24.57, de: 100.70, rank: '#2 da marca · 4.755 vendidos em 30 dias', desc: 'Caixa M de frango frito + 1 acompanhamento Super + 1 molho.', up: ['coca', 'molho', 'brig'] },
    { id: 'combop', cat: 'top', nome: 'Combo P · 1 a 2 pessoas', img: 'combo-p', preco: 55.90, custo: 17.39, de: 75.70, rank: '#3 da marca · 4.251 vendidos em 30 dias', desc: 'Caixa P de frango frito + 1 acompanhamento Super + 1 molho.', up: ['coca', 'molho', 'brig'] },
    { id: 'bitesm', cat: 'top', nome: 'Chicken Bites M', img: 'bites-m', preco: 52.90, custo: 15.13, rank: '#4 da marca · 3.293 vendidos em 30 dias', desc: 'Cubinhos de peito de frango frito crocante, marinados com o tempero N1.', up: ['batata', 'coca', 'molho'] },
    // Pra 1 pessoa
    { id: 'trio', cat: 'solo', nome: 'Trio Burger N1', img: 'trio-burger', preco: 44.90, custo: 12.79, de: 55.70, selo: 'Recomendado', desc: 'Seu burger de frango frito + batata individual + Coca lata.', up: ['molho', 'brig'] },
    { id: 'dupla', cat: 'solo', nome: 'Dupla N1', img: 'chicken-burger', preco: 39.90, custo: 10.77, de: 43.80, desc: 'Chicken Burger + Coca lata. O jeito mais rápido de matar a fome.', up: ['batata', 'molho', 'brig'] },
    { id: 'triocp', cat: 'solo', nome: 'Trio Caixa P', img: 'trio-caixa-p', preco: 49.90, custo: 16.05, de: 58.70, desc: 'Caixa P (275 g de tiras) + purê de batatas + Coca lata.', up: ['molho', 'brig'] },
    { id: 'bitesp', cat: 'solo', nome: 'Chicken Bites P', img: 'bites-p', preco: 28.90, custo: 8.44, rank: '#5 da marca · 3.156 vendidos', desc: 'A porção individual dos cubinhos crocantes.', up: ['batata', 'coca', 'molho'] },
    // Pra 2 pessoas
    { id: 'dois2', ref: 'dois', cat: 'dupla', nome: '2 Burguers com Desconto', img: 'dois-burgers', preco: 49.90, custo: 14.13, de: 63.80, ml: true, desc: 'Dois burgers de frango frito crocante no pão brioche.', up: ['kit', 'molho', 'brig'] },
    { id: 'doiscocas', cat: 'dupla', nome: '2 Burgers + 2 Cocas', img: 'dois-burgers-cocas', preco: 59.90, custo: 20.76, de: 87.60, desc: 'Dois burgers + duas Coca lata. Por mais R$ 10 que a dupla simples.', up: ['batata', 'molho', 'brig'] },
    { id: 'combop2', ref: 'combop', cat: 'dupla', nome: 'Combo P · 1 a 2 pessoas', img: 'combo-p', preco: 55.90, custo: 17.39, de: 75.70, desc: 'Caixa P + 1 acompanhamento Super + 1 molho.', up: ['coca', 'molho', 'brig'] },
    // Pra 3 ou mais
    { id: 'combom2', ref: 'combom', cat: 'galera', nome: 'Combo M · 2 a 3 pessoas', img: 'combo-m', preco: 79.90, custo: 24.57, de: 100.70, selo: 'Mais escolhido', pp: 3, desc: 'Caixa M + 1 acompanhamento Super + 1 molho.', up: ['coca', 'molho', 'brig'] },
    { id: 'super', cat: 'dupla', nome: 'Super Combo', img: 'super-combo', preco: 89.90, custo: 27.29, de: 122.50, pp: 2, desc: '2 burgers + batata Super + 2 Coca lata.', up: ['molho', 'brig'] },
    { id: 'combog', cat: 'galera', nome: 'Combo G · 3 a 5 pessoas', img: 'combo-g', preco: 139.90, custo: 41.61, pp: 5, desc: 'Caixa G + 2 acompanhamentos + 2 molhos.', up: ['coca', 'molho', 'brig'] },
    { id: 'combogg', cat: 'galera', nome: 'Combo GG · 5 a 7 pessoas', img: 'combo-gg', preco: 219.90, custo: 59.51, pp: 7, desc: 'Caixa G + Caixa M + 2 acompanhamentos + 3 molhos.', up: ['coca', 'molho', 'brig'] },
    // Burgers
    { id: 'bbq', cat: 'burgers', nome: 'Chicken Barbecue', img: 'bbq', preco: 29.90, custo: 6.75, desc: 'Pão brioche, frango frito crocante e barbecue.', up: ['trio', 'molho', 'brig'] },
    { id: 'cb', cat: 'burgers', nome: 'Chicken Burguer', img: 'chicken-burger', preco: 31.90, custo: 7.03, desc: 'Pão brioche, frango frito crocante e a maionese verde da casa.', up: ['trio', 'molho', 'brig'] },
    { id: 'cs', cat: 'burgers', nome: 'Chicken Salada', img: 'salada-burger', preco: 33.90, custo: 7.46, desc: 'Frango crocante, maionese verde, cheddar, picles, alface, tomate e cebola.', up: ['trio', 'molho', 'brig'] },
    { id: 'gb', cat: 'burgers', nome: 'Chicken Garlic Bacon', img: 'garlic-bacon', preco: 38.90, custo: 8.37, desc: 'Maionese de alho com queijo, bacon, picles, alface e tomate.', up: ['trio', 'molho', 'brig'] },
    { id: 'ob', cat: 'burgers', nome: 'Chicken Onion Burger', img: 'onion-burger', preco: 38.90, custo: 8.26, desc: 'Anéis de cebola crocantes e maionese de bacon.', up: ['trio', 'molho', 'brig'] },
    { id: 'bbc', cat: 'burgers', nome: 'Chicken BBC', img: 'bbc', preco: 39.90, custo: 8.50, desc: 'Barbecue, bacon e cheddar com o melhor frango frito.', up: ['trio', 'molho', 'brig'] },
    // Frango na caixa
    { id: 'cxp', cat: 'caixas', nome: 'Caixa P · Cortes Clássicos', img: 'caixa-p', preco: 31.90, custo: 8.96, desc: '275 g de tiras de frango frito crocante. Serve 1 pessoa.', up: ['trioCaixa', 'molho', 'brig'] },
    { id: 'cxm', cat: 'caixas', nome: 'Caixa M · Cortes Clássicos', img: 'caixa-m', preco: 56.90, custo: 16.17, desc: 'O dobro da Caixa P. Serve 2 pessoas.', up: ['batata', 'coca', 'molho'] },
    { id: 'cxg', cat: 'caixas', nome: 'Caixa G · Cortes Clássicos', img: 'caixa-g', preco: 92.90, custo: 26.20, desc: 'Pra dividir com a galera. Serve 3 a 4 pessoas.', up: ['batata', 'coca', 'molho'] },
    { id: 'bitesp2', ref: 'bitesp', cat: 'caixas', nome: 'Chicken Bites P', img: 'bites-p', preco: 28.90, custo: 8.44, desc: 'Cubinhos de peito de frango frito crocante.', up: ['batata', 'coca', 'molho'] },
    { id: 'bitesm2', ref: 'bitesm', cat: 'caixas', nome: 'Chicken Bites M', img: 'bites-m', preco: 52.90, custo: 15.13, desc: 'A porção pra dividir dos cubinhos crocantes.', up: ['batata', 'coca', 'molho'] },
    // Refeições
    { id: 'exec', cat: 'refeicoes', nome: 'Executivo N1', img: 'executivo', preco: 44.90, custo: 14.04, de: 60.70, selo: 'Refeição completa', desc: 'Sua refeição N1 + Coca lata + brigadeiro.', up: ['molho'] },
    { id: 'estrog', cat: 'refeicoes', nome: 'Estrogonofe de Frango N1', img: 'estrogonofe', preco: 33.90, custo: 8.33, desc: 'Estrogonofe cremoso, arroz soltinho e batata palha.', up: ['coca', 'brig'] },
    { id: 'trad', cat: 'refeicoes', nome: 'Tradicional N1', img: 'tradicional', preco: 38.90, custo: 8.70, desc: 'Frango frito crocante, arroz e o acompanhamento que você escolher.', up: ['coca', 'brig'] },
    { id: 'parm', cat: 'refeicoes', nome: 'Frango à Parmegiana N1', img: 'parmegiana', preco: 38.90, custo: 8.40, desc: 'Peito de frango crocante, molho de tomate e queijo gratinado.', up: ['coca', 'brig'] },
    { id: 'frsal', cat: 'refeicoes', nome: 'Frango Frito com Salada', img: 'frango-salada', preco: 38.90, custo: 8.41, desc: 'Frango crocante, purê e saladinha com picles da casa.', up: ['coca', 'brig'] },
    { id: 'fric', cat: 'refeicoes', nome: 'Fricassê N1', img: 'fricasse', preco: 39.90, custo: 6.22, desc: 'Frango desfiado, creme com milho e Catupiry, arroz e batata palha.', up: ['coca', 'brig'] },
    // Acompanhamentos
    { id: 'batata', cat: 'acomp', nome: 'Batata Frita', img: 'batata', preco: 11.90, custo: 2.02, tam: 'Individual R$ 11,90 · Super R$ 34,90 · Mega R$ 59,90', desc: 'Crocante mesmo no delivery.', up: ['molho'] },
    { id: 'aipim', cat: 'acomp', nome: 'Aipim Frito', img: 'aipim', preco: 12.90, custo: 1.71, tam: 'Individual R$ 12,90 · Super R$ 32,90 · Mega R$ 54,90', desc: 'Mandioca, aipim ou macaxeira. Irresistível.', up: ['molho'] },
    { id: 'onion', cat: 'acomp', nome: 'Onion Rings', img: 'onion-rings', preco: 12.90, custo: 2.62, tam: 'Individual R$ 12,90 · Super R$ 36,90 · Mega R$ 62,90', desc: 'Anéis de cebola empanados e crocantes.', up: ['molho'] },
    { id: 'cheddar', cat: 'acomp', nome: 'Batata Cheddar & Bacon', img: 'batata-cheddar', preco: 42.90, custo: 9.94, tam: 'Super R$ 42,90 · Mega R$ 79,90', desc: 'Molho de cheddar e bacon à parte pra batata chegar crocante.', up: [] },
    { id: 'pure', cat: 'acomp', nome: 'Purê de Batatas', img: 'pure', preco: 14.90, custo: 3.18, tam: 'Super R$ 14,90 · Mega R$ 21,90', desc: 'Cremoso. Fica ainda melhor com o frango.', up: [] },
    { id: 'arroz', cat: 'acomp', nome: 'Arroz Branco', img: 'arroz', preco: 9.90, custo: 0.45, desc: 'Soltinho, do jeito que todo mundo ama.', up: [] },
    { id: 'salada', cat: 'acomp', nome: 'Salada', img: 'salada', preco: 15.90, custo: 3.58, desc: 'Alface americana, tomate, cebola e picles da casa.', up: [] },
    // Molhos
    { id: 'molhos', cat: 'molhos', nome: 'Molhos no potinho', img: 'maioneses', preco: 8.90, custo: 1.87, tam: 'Verde · Alho e queijo · Bacon · Ketchup · Mostarda · Barbecue R$ 8,90 · Cheddar R$ 11,90', desc: 'No combo, qualquer molho sai por R$ 5,90.', up: [] },
    // Sobremesas e bebidas
    { id: 'brig', cat: 'doces', nome: 'Brigadeiro N1', img: 'brigadeiro', preco: 9.90, custo: 2.02, desc: 'Brigadeiro caseiro. No combo sai por R$ 6,90.', up: [] },
    { id: 'churros', cat: 'doces', nome: 'Churros N1', img: 'churros', preco: 11.90, custo: 2.63, tam: 'Individual R$ 11,90 · Super R$ 32,90', desc: 'Açúcar e canela. O doce final perfeito.', up: [] },
    { id: 'coca', cat: 'doces', nome: 'Coca-Cola lata', img: 'coca', preco: 11.90, custo: 3.64, tam: 'Normal ou sem açúcar', desc: '310 ml ou 350 ml conforme a região.', up: [] },
    { id: 'coca2', cat: 'doces', nome: 'Coca-Cola grande', img: 'coca-zero', preco: 23.90, custo: 9.91, tam: 'Normal ou sem açúcar', desc: '1,5 L ou 2 L conforme a região.', up: [] }
  ]
};

// "Quem pediu, também levou" (só no app próprio): os 2 itens que mais saem junto com cada produto.
// Fonte: BI Tastefy, vps_fato.itens_pedidos, N1, pedidos concluídos de 30/08 a 28/09/2026.
// n = pedidos com os dois itens juntos. Coca soma normal e sem açúcar. Molhos soma Maioneses e Molhos Extras.
window.N1.junto = {
  dois: [{ id: 'coca', n: 324 }, { id: 'batata', n: 236 }],
  combom: [{ id: 'molhos', n: 377 }, { id: 'coca', n: 164 }],
  combop: [{ id: 'coca', n: 203 }, { id: 'molhos', n: 123 }],
  bitesm: [{ id: 'molhos', n: 136 }, { id: 'batata', n: 134 }],
  bitesp: [{ id: 'molhos', n: 125 }, { id: 'batata', n: 120 }],
  trio: [{ id: 'molhos', n: 43 }, { id: 'bitesp', n: 17 }],
  super: [{ id: 'molhos', n: 46 }, { id: 'dois', n: 18 }],
  combog: [{ id: 'coca', n: 53 }, { id: 'molhos', n: 43 }],
  combogg: [{ id: 'coca', n: 10 }, { id: 'arroz', n: 4 }],
  bbq: [{ id: 'coca', n: 6 }, { id: 'ob', n: 6 }],
  cb: [{ id: 'coca', n: 81 }, { id: 'batata', n: 35 }],
  cs: [{ id: 'batata', n: 60 }, { id: 'molhos', n: 37 }],
  gb: [{ id: 'coca', n: 55 }, { id: 'batata', n: 25 }],
  ob: [{ id: 'batata', n: 16 }, { id: 'molhos', n: 13 }],
  bbc: [{ id: 'batata', n: 11 }, { id: 'combop', n: 6 }],
  cxp: [{ id: 'batata', n: 51 }, { id: 'molhos', n: 48 }],
  cxm: [{ id: 'molhos', n: 30 }, { id: 'coca', n: 27 }],
  cxg: [{ id: 'batata', n: 18 }, { id: 'dois', n: 16 }],
  trad: [{ id: 'molhos', n: 26 }, { id: 'parm', n: 10 }],
  estrog: [{ id: 'coca', n: 16 }, { id: 'batata', n: 9 }],
  parm: [{ id: 'brig', n: 7 }, { id: 'bitesp', n: 7 }],
  frsal: [{ id: 'trio', n: 4 }, { id: 'trad', n: 3 }],
  fric: [{ id: 'batata', n: 6 }, { id: 'coca', n: 4 }],
  batata: [{ id: 'dois', n: 236 }, { id: 'bitesm', n: 134 }],
  molhos: [{ id: 'combom', n: 242 }, { id: 'bitesm', n: 136 }],
  onion: [{ id: 'combom', n: 67 }, { id: 'batata', n: 54 }],
  aipim: [{ id: 'batata', n: 41 }, { id: 'bitesm', n: 32 }],
  arroz: [{ id: 'combom', n: 43 }, { id: 'combop', n: 37 }],
  salada: [{ id: 'arroz', n: 27 }, { id: 'batata', n: 14 }],
  cheddar: [{ id: 'bitesm', n: 20 }, { id: 'dois', n: 11 }],
  brig: [{ id: 'dois', n: 18 }, { id: 'bitesp', n: 17 }],
  churros: [{ id: 'dois', n: 36 }, { id: 'molhos', n: 23 }],
  coca: [{ id: 'dois', n: 324 }, { id: 'combop', n: 203 }]
};
