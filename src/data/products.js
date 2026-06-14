export const WEIGHTS = [
  { value: 0.25, label: '250 г', coefficient: 0.28 },
  { value: 0.5, label: '500 г', coefficient: 0.52 },
  { value: 1, label: '1 кг', coefficient: 1 },
  { value: 3, label: '3 кг', coefficient: 2.75 },
];

export const CATEGORIES = [
  { id: 'all', label: 'Все сорта' },
  { id: 'flower', label: 'Цветочный' },
  { id: 'herbal', label: 'Разнотравье' },
  { id: 'buckwheat', label: 'Гречишный' },
  { id: 'linden', label: 'Липовый' },
  { id: 'sunflower', label: 'Подсолнечный' },
  { id: 'acacia', label: 'Акациевый' },
];

export const products = [
  {
    id: 'flower',
    name: 'Цветочный мёд',
    category: 'flower',
    categoryLabel: 'Цветочный',
    pricePerKg: 450,
    rating: 4.8,
    reviewsCount: 127,
    badge: 'hit',
    inStock: true,
    image: '🌸',
    color: '#F5C842',
    description: 'Светлый, нежный мёд с лёгким цветочным ароматом. Идеально подходит для детей и тех, кто пробует натуральный мёд впервые.',
    taste: 'Мягкий, сладкий, с тонкими цветочными нотками',
    aroma: 'Лёгкий цветочный',
    colorDesc: 'Светло-янтарный',
    benefits: ['Укрепляет иммунитет', 'Подходит детям', 'Мягкий вкус'],
    reviews: [
      { id: 1, author: 'Анна М.', rating: 5, text: 'Очень нежный вкус, дети в восторге. Буду заказывать ещё!', date: '2026-05-12' },
      { id: 2, author: 'Сергей П.', rating: 4, text: 'Хороший мёд, приятный аромат. Доставка быстрая.', date: '2026-04-28' },
    ],
  },
  {
    id: 'herbal',
    name: 'Мёд разнотравье',
    category: 'herbal',
    categoryLabel: 'Разнотравье',
    pricePerKg: 500,
    rating: 4.9,
    reviewsCount: 203,
    badge: 'bestseller',
    inStock: true,
    image: '🌿',
    color: '#D4A017',
    description: 'Насыщенный аромат луговых трав и янтарный цвет делают этот мёд фаворитом среди постоянных покупателей.',
    taste: 'Насыщенный, терпкий, с медовой сладостью',
    aroma: 'Травянистый, луговой',
    colorDesc: 'Янтарный',
    benefits: ['Самый популярный сорт', 'Богат микроэлементами', 'Универсален в применении'],
    reviews: [
      { id: 1, author: 'Марина К.', rating: 5, text: 'Лучший мёд, который я пробовала. Настоящий вкус детства!', date: '2026-06-01' },
      { id: 2, author: 'Дмитрий В.', rating: 5, text: 'Заказываю третий раз. Качество стабильно отличное.', date: '2026-05-20' },
      { id: 3, author: 'Ольга С.', rating: 5, text: 'Отлично подходит для чая и выпечки.', date: '2026-05-15' },
    ],
  },
  {
    id: 'buckwheat',
    name: 'Гречишный мёд',
    category: 'buckwheat',
    categoryLabel: 'Гречишный',
    pricePerKg: 550,
    rating: 4.7,
    reviewsCount: 89,
    badge: 'sale',
    inStock: true,
    image: '🌲',
    color: '#8B4513',
    description: 'Тёмный мёд с характерным острым вкусом. Богат железом и антиоксидантами, помогает при простуде и анемии.',
    taste: 'Острый, насыщенный, терпкий',
    aroma: 'Тёмный, пряный',
    colorDesc: 'Тёмно-коричневый',
    benefits: ['Богат железом', 'Много антиоксидантов', 'Помогает при простуде'],
    reviews: [
      { id: 1, author: 'Игорь Н.', rating: 5, text: 'Настоящий гречишный мёд! Очень насыщенный вкус.', date: '2026-05-30' },
      { id: 2, author: 'Елена Р.', rating: 4, text: 'Специфический вкус, но именно такой мне и нужен.', date: '2026-05-10' },
    ],
  },
  {
    id: 'linden',
    name: 'Липовый мёд',
    category: 'linden',
    categoryLabel: 'Липовый',
    pricePerKg: 600,
    rating: 4.9,
    reviewsCount: 156,
    badge: 'new',
    inStock: true,
    image: '🍋',
    color: '#F0E68C',
    description: 'Лёгкий, прозрачный мёд с тонким ароматом липы. Классическое средство от простуды с горячим чаем.',
    taste: 'Мягкий, с лёгкой мятной свежестью',
    aroma: 'Липовый, цветочный',
    colorDesc: 'Светло-золотистый',
    benefits: ['При простуде', 'Успокаивает горло', 'Прозрачная консистенция'],
    reviews: [
      { id: 1, author: 'Татьяна З.', rating: 5, text: 'Волшебный вкус! Добавляю в чай каждый вечер.', date: '2026-06-08' },
      { id: 2, author: 'Андрей М.', rating: 5, text: 'Жена в восторге. Заказали сразу 3 кг.', date: '2026-05-25' },
    ],
  },
  {
    id: 'sunflower',
    name: 'Подсолнечный мёд',
    category: 'sunflower',
    categoryLabel: 'Подсолнечный',
    pricePerKg: 400,
    rating: 4.6,
    reviewsCount: 74,
    badge: null,
    inStock: true,
    image: '🌻',
    color: '#FFD700',
    description: 'Быстро кристаллизуется, нежно-жёлтого цвета. Мягкий вкус, отлично сочетается с маслом на тосте.',
    taste: 'Мягкий, сливочный, с лёгкой кислинкой',
    aroma: 'Цветочный, солнечный',
    colorDesc: 'Жёлтый',
    benefits: ['Быстро кристаллизуется', 'Недорогой', 'Универсальный'],
    reviews: [
      { id: 1, author: 'Наталья Б.', rating: 5, text: 'Отличный мёд за свои деньги. Вкусный и натуральный.', date: '2026-05-18' },
      { id: 2, author: 'Павел Г.', rating: 4, text: 'Хорош для выпечки, кристаллизуется быстро.', date: '2026-04-30' },
    ],
  },
  {
    id: 'acacia',
    name: 'Акациевый мёд',
    category: 'acacia',
    categoryLabel: 'Акациевый',
    pricePerKg: 650,
    rating: 4.9,
    reviewsCount: 112,
    badge: 'premium',
    inStock: true,
    image: '🍃',
    color: '#FFF8DC',
    description: 'Самый светлый и жидкий сорт. Долго не кристаллизуется, обладает деликатным ароматом белой акации.',
    taste: 'Очень мягкий, изысканный, нежный',
    aroma: 'Деликатный, акациевый',
    colorDesc: 'Почти прозрачный',
    benefits: ['Долго остаётся жидким', 'Премиальный сорт', 'Подходит аллергикам'],
    reviews: [
      { id: 1, author: 'Виктория Л.', rating: 5, text: 'Премиальный мёд, очень изысканный вкус. Беру на подарки.', date: '2026-06-05' },
      { id: 2, author: 'Алексей Д.', rating: 5, text: 'Действительно долго не кристаллизуется. Качество топ!', date: '2026-05-22' },
    ],
  },
];

export const getProductById = (id) => products.find((p) => p.id === id);

export const getRelatedProducts = (currentId, limit = 3) =>
  products.filter((p) => p.id !== currentId).slice(0, limit);

export const calculatePrice = (pricePerKg, weightCoefficient) =>
  Math.round(pricePerKg * weightCoefficient);

export const getBadgeLabel = (badge) => {
  switch (badge) {
    case 'hit': return 'Хит';
    case 'bestseller': return 'Бестселлер';
    case 'new': return 'Новинка';
    case 'sale': return 'Скидка';
    case 'premium': return 'Premium';
    default: return '';
  }
};

export const benefits = [
  {
    id: 1,
    icon: '🐝',
    title: 'Своя пасека',
    text: 'Собираем мёд на собственной пасеке в экологически чистом районе, вдали от дорог и промышленных зон.',
  },
  {
    id: 2,
    icon: '🌿',
    title: '100% натурально',
    text: 'Без подогрева, добавок и консервантов. Только то, что приготовили пчёлы.',
  },
  {
    id: 3,
    icon: '📋',
    title: 'Лабораторный контроль',
    text: 'Каждая партия проходит проверку качества. Документы предоставляем по запросу.',
  },
  {
    id: 4,
    icon: '🚚',
    title: 'Быстрая доставка',
    text: 'Доставляем по городу в день заказа. По России — от 1 до 5 дней транспортными компаниями.',
  },
];

export const reviews = [
  {
    id: 1,
    author: 'Анна М.',
    rating: 5,
    text: 'Наконец-то нашла настоящий натуральный мёд! Вкус невероятный, доставка быстрая.',
    avatar: '👩',
  },
  {
    id: 2,
    author: 'Сергей П.',
    rating: 5,
    text: 'Заказываю уже полгода. Качество всегда на высоте, разнотравье — просто бомба!',
    avatar: '👨',
  },
  {
    id: 3,
    author: 'Марина К.',
    rating: 5,
    text: 'Оформила подарочный набор коллегам. Все были в восторге от вкуса и упаковки.',
    avatar: '👩‍💼',
  },
];
