import type { Category, Product } from '../types';

const I = (f: string) => `images/${f}`;

export const categories: Category[] = [
  { id: 'laptop', title: 'لپ‌تاپ', subtitle: 'اولترابوک و روزمره', icon: 'laptop', image: I('p-ultrabook.png') },
  { id: 'gaming', title: 'لپ‌تاپ گیمینگ', subtitle: 'قدرت بی‌وقفه', icon: 'gamepad', image: I('hero-laptop.png') },
  { id: 'monitor', title: 'مانیتور', subtitle: 'تصویر بی‌نقص', icon: 'monitor', image: I('cat-monitor.jpg') },
  { id: 'gpu', title: 'کارت گرافیک', subtitle: 'رندر و بازی', icon: 'cpu', image: I('cat-gpu.jpg') },
  { id: 'pc', title: 'سیستم اسمبل', subtitle: 'ساخت سفارشی', icon: 'fan', image: I('cat-pc.jpg') },
  { id: 'memory', title: 'رم و حافظه', subtitle: 'DDR5 و SSD', icon: 'drive', image: I('cat-ram.jpg') },
  { id: 'keyboard', title: 'کیبورد', subtitle: 'مکانیکال و بی‌سیم', icon: 'keyboard', image: I('cat-keyboard.jpg') },
  { id: 'mouse', title: 'ماوس', subtitle: 'دقت در هر کلیک', icon: 'mouse', image: I('cat-mouse.jpg') },
  { id: 'audio', title: 'هدفون و صدا', subtitle: 'غرق در صدا', icon: 'headphones', image: I('cat-audio.jpg') }
];

export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c])) as Record<string, Category>;

export const products: Product[] = [
  {
    id: 'aero-14',
    title: 'لپ‌تاپ اولترابوک Aero 14',
    subtitle: 'Core Ultra 7 · رم ۱۶ گیگ · SSD یک ترابایت',
    category: 'laptop', brand: 'Novatek',
    price: 68_900_000, oldPrice: 74_500_000, rating: 4.9, reviews: 214, stock: 7,
    images: [I('p-ultrabook.png'), I('laptop-desk.jpg'), I('workspace.jpg')],
    badge: 'new', featured: true, deal: true,
    colors: ['#C9CED6', '#2B2F3A'],
    highlights: ['بدنه یکپارچه آلومینیومی با وزن ۱.۱ کیلوگرم', 'نمایشگر ۲.۸K OLED با پوشش ۱۰۰٪ DCI-P3', 'تا ۱۸ ساعت شارژدهی واقعی', 'شارژ سریع ۶۵ وات USB-C'],
    specs: [['پردازنده', 'Intel Core Ultra 7 155H'], ['حافظه رم', '16GB LPDDR5X'], ['حافظه داخلی', '1TB NVMe Gen4'], ['نمایشگر', '14" 2.8K OLED 120Hz'], ['وزن', '۱.۱ کیلوگرم'], ['سیستم‌عامل', 'Windows 11 Home']]
  },
  {
    id: 'helix-g16',
    title: 'لپ‌تاپ گیمینگ Helix G16',
    subtitle: 'RTX 4070 · Core i9 · نمایشگر ۲۴۰ هرتز',
    category: 'gaming', brand: 'Helix',
    price: 112_000_000, oldPrice: 124_000_000, rating: 4.8, reviews: 168, stock: 4,
    images: [I('hero-laptop.png'), I('setup-dark.jpg'), I('cat-keyboard.jpg')],
    badge: 'hot', featured: true, deal: true,
    colors: ['#1B1F2B', '#6B7BBE'],
    highlights: ['کارت گرافیک RTX 4070 با TGP کامل ۱۴۰ وات', 'نمایشگر QHD+ با نرخ نوسازی ۲۴۰ هرتز', 'خنک‌کننده محفظه بخار با سه فن', 'کیبورد RGB تک‌کلید'],
    specs: [['پردازنده', 'Intel Core i9-14900HX'], ['گرافیک', 'RTX 4070 8GB'], ['حافظه رم', '32GB DDR5 5600'], ['حافظه داخلی', '2TB NVMe Gen4'], ['نمایشگر', '16" QHD+ 240Hz'], ['وزن', '۲.۴ کیلوگرم']]
  },
  {
    id: 'orbit-15',
    title: 'لپ‌تاپ Orbit 15 Creator',
    subtitle: 'Ryzen 7 · رم ۱۶ گیگ · مناسب طراحی',
    category: 'laptop', brand: 'Orbit',
    price: 54_400_000, rating: 4.6, reviews: 92, stock: 12,
    images: [I('laptop-desk.jpg'), I('workspace2.jpg')],
    colors: ['#F2F2F2', '#C9CED6'],
    highlights: ['کالیبراسیون رنگ کارخانه‌ای ΔE<2', 'بدنه سفید مات ضد اثر انگشت', 'کیبورد کامل با بخش اعداد', 'وب‌کم ۱۰۸۰p با حریم خصوصی'],
    specs: [['پردازنده', 'AMD Ryzen 7 8845HS'], ['حافظه رم', '16GB DDR5'], ['حافظه داخلی', '512GB NVMe'], ['نمایشگر', '15.6" FHD IPS 100% sRGB'], ['وزن', '۱.۷ کیلوگرم']]
  },
  {
    id: 'flip-13',
    title: 'لپ‌تاپ تبدیل‌شونده Flip 13',
    subtitle: 'لمسی ۳۶۰ درجه · قلم هوشمند',
    category: 'laptop', brand: 'Kairo',
    price: 41_900_000, oldPrice: 45_000_000, rating: 4.5, reviews: 61, stock: 0,
    images: [I('cat-laptop.jpg'), I('laptop-desk.jpg')],
    highlights: ['لولای ۳۶۰ درجه برای حالت تبلت', 'قلم هوشمند ۴۰۹۶ سطح فشار', 'وزن فوق‌سبک ۱.۲ کیلوگرم'],
    specs: [['پردازنده', 'Intel Core i5-1335U'], ['حافظه رم', '8GB LPDDR5'], ['حافظه داخلی', '512GB NVMe'], ['نمایشگر', '13.3" FHD Touch']]
  },
  {
    id: 'vista-34',
    title: 'مانیتور خمیده Vista 34 Ultrawide',
    subtitle: 'WQHD · ۱۶۵ هرتز · HDR400',
    category: 'monitor', brand: 'Vista',
    price: 29_800_000, oldPrice: 33_200_000, rating: 4.8, reviews: 133, stock: 9,
    images: [I('cat-monitor.jpg'), I('workspace.jpg')],
    badge: 'hot', featured: true, deal: true,
    highlights: ['پنل VA خمیده 1500R', 'زمان پاسخ‌دهی ۱ میلی‌ثانیه', 'پورت USB-C با شارژ ۹۰ وات'],
    specs: [['اندازه', '۳۴ اینچ'], ['رزولوشن', '3440×1440'], ['نرخ نوسازی', '165Hz'], ['پنل', 'VA Curved 1500R'], ['ورودی‌ها', 'HDMI 2.1 · DP 1.4 · USB-C']]
  },
  {
    id: 'studio-27',
    title: 'ست مانیتور Studio 27 + پایه',
    subtitle: '4K IPS · کالیبره برای طراحان',
    category: 'monitor', brand: 'Vista',
    price: 24_600_000, rating: 4.7, reviews: 48, stock: 6,
    images: [I('workspace.jpg'), I('workspace2.jpg')],
    highlights: ['پوشش ۹۸٪ DCI-P3', 'پایه ارگونومیک با چرخش ۹۰ درجه', 'هاب USB داخلی'],
    specs: [['اندازه', '۲۷ اینچ'], ['رزولوشن', '3840×2160'], ['پنل', 'IPS Black'], ['نرخ نوسازی', '60Hz']]
  },
  {
    id: 'storm-4070',
    title: 'کارت گرافیک Storm RTX 4070 Super',
    subtitle: '12GB GDDR6X · سه فن',
    category: 'gpu', brand: 'Storm',
    price: 46_500_000, oldPrice: 49_900_000, rating: 4.9, reviews: 201, stock: 5,
    images: [I('cat-gpu.jpg'), I('cat-pc.jpg')],
    badge: 'limited', featured: true,
    highlights: ['معماری Ada Lovelace با DLSS 3.5', 'خنک‌کننده سه‌فن با بک‌پلیت فلزی', 'حالت بی‌صدا در بار کم'],
    specs: [['حافظه', '12GB GDDR6X'], ['کلاک بوست', '2505 MHz'], ['توان', '220W'], ['خروجی‌ها', '3× DP · 1× HDMI']]
  },
  {
    id: 'pulse-ddr5',
    title: 'رم دسکتاپ Pulse DDR5 32GB',
    subtitle: 'دو ماژول ۱۶ گیگ · 6000MHz',
    category: 'memory', brand: 'Pulse',
    price: 6_850_000, oldPrice: 7_400_000, rating: 4.7, reviews: 310, stock: 34,
    images: [I('cat-ram.jpg'), I('service-ram.jpg')],
    deal: true,
    highlights: ['پشتیبانی از XMP 3.0 و EXPO', 'هیت‌سینک آلومینیومی کم‌ارتفاع', 'گارانتی مادام‌العمر'],
    specs: [['ظرفیت', '2×16GB'], ['فرکانس', '6000MHz'], ['تاخیر', 'CL30'], ['ولتاژ', '1.35V']]
  },
  {
    id: 'forge-k75',
    title: 'کیبورد مکانیکال Forge K75',
    subtitle: 'هات‌سواپ · RGB · سوییچ لینیر',
    category: 'keyboard', brand: 'Forge',
    price: 5_900_000, rating: 4.8, reviews: 142, stock: 18,
    images: [I('cat-keyboard.jpg'), I('setup-dark.jpg')],
    badge: 'new', featured: true,
    highlights: ['قابلیت تعویض سوییچ بدون لحیم', 'فوم‌های میرایی سه‌لایه', 'اتصال سه‌حالته بلوتوث/2.4G/سیم'],
    specs: [['چیدمان', '75%'], ['سوییچ', 'Linear Pre-lubed'], ['اتصال', 'BT 5.1 · 2.4G · USB-C'], ['باتری', '4000mAh']]
  },
  {
    id: 'raptor-m1',
    title: 'ماوس گیمینگ Raptor M1',
    subtitle: 'سنسور ۲۶ هزار DPI · ۵۸ گرم',
    category: 'mouse', brand: 'Raptor',
    price: 3_250_000, oldPrice: 3_700_000, rating: 4.6, reviews: 97, stock: 22,
    images: [I('cat-mouse.jpg')],
    deal: true,
    highlights: ['وزن فوق‌سبک ۵۸ گرم', 'سوییچ‌های اپتیکال ۹۰ میلیون کلیک', 'نرخ گزارش‌دهی ۴۰۰۰ هرتز'],
    specs: [['سنسور', '26K DPI Optical'], ['وزن', '۵۸ گرم'], ['اتصال', 'Wireless 2.4G · USB-C'], ['باتری', '۸۰ ساعت']]
  },
  {
    id: 'echo-h7',
    title: 'هدفون بی‌سیم Echo H7',
    subtitle: 'نویزکنسلینگ فعال · ۴۰ ساعت',
    category: 'audio', brand: 'Echo',
    price: 8_400_000, oldPrice: 9_600_000, rating: 4.7, reviews: 176, stock: 11,
    images: [I('cat-audio.jpg')],
    featured: true, deal: true,
    highlights: ['حذف نویز تطبیقی هیبریدی', 'کدک‌های LDAC و aptX HD', 'شارژ ۱۰ دقیقه برای ۵ ساعت پخش'],
    specs: [['نوع', 'روگوشی بسته'], ['اتصال', 'Bluetooth 5.3'], ['باتری', '۴۰ ساعت'], ['وزن', '۲۵۰ گرم']]
  },
  {
    id: 'titan-build',
    title: 'سیستم گیمینگ اسمبل Titan',
    subtitle: 'Ryzen 7 7800X3D · RTX 4070 Super',
    category: 'pc', brand: 'آرنوتک',
    price: 138_000_000, rating: 5, reviews: 39, stock: 3,
    images: [I('cat-pc.jpg'), I('cat-gpu.jpg'), I('setup-dark.jpg')],
    badge: 'limited', featured: true,
    highlights: ['مونتاژ و کابل‌کشی حرفه‌ای در کارگاه آرنوتک', 'تست پایداری ۲۴ ساعته پیش از ارسال', 'خنک‌کننده مایع ۳۶۰ میلی‌متری'],
    specs: [['پردازنده', 'AMD Ryzen 7 7800X3D'], ['گرافیک', 'RTX 4070 Super 12GB'], ['رم', '32GB DDR5 6000'], ['حافظه', '2TB NVMe Gen4'], ['پاور', '850W Gold']]
  },
  {
    id: 'cozy-station',
    title: 'ست کامل Creator Station',
    subtitle: 'سه مانیتور · مناسب استریم و تدوین',
    category: 'pc', brand: 'آرنوتک',
    price: 186_000_000, oldPrice: 198_000_000, rating: 4.9, reviews: 21, stock: 2,
    images: [I('setup-dark.jpg'), I('cat-monitor.jpg')],
    highlights: ['طراحی چیدمان میز توسط کارشناس', 'نصب و راه‌اندازی در محل (تهران)', 'یک سال پشتیبانی نرم‌افزاری'],
    specs: [['مانیتورها', '۳× ۲۷ اینچ QHD'], ['پردازنده', 'Core i7-14700K'], ['گرافیک', 'RTX 4080 Super'], ['رم', '64GB DDR5']]
  }
];

export const productById = Object.fromEntries(products.map((p) => [p.id, p])) as Record<string, Product>;
export const productMap = productById;

export const brands = Array.from(new Set(products.map((p) => p.brand)));

export const builds = [
  { id: 'b1', title: 'استیشن استریم شبانه', image: I('setup-dark.jpg'), cpu: 'Core i7-14700K', gpu: 'RTX 4080 S', use: 'استریم و تدوین', product: 'cozy-station' },
  { id: 'b2', title: 'سیستم گیمینگ Titan', image: I('cat-pc.jpg'), cpu: 'Ryzen 7 7800X3D', gpu: 'RTX 4070 S', use: 'گیمینگ 2K', product: 'titan-build' },
  { id: 'b3', title: 'میز کار مینیمال', image: I('workspace.jpg'), cpu: 'Core Ultra 7', gpu: 'Arc گرافیک', use: 'برنامه‌نویسی', product: 'aero-14' },
  { id: 'b4', title: 'استودیو طراحی خانگی', image: I('workspace2.jpg'), cpu: 'Ryzen 7 8845HS', gpu: 'Radeon 780M', use: 'طراحی گرافیک', product: 'orbit-15' },
  { id: 'b5', title: 'گوشه گیمینگ اولترا‌واید', image: I('cat-monitor.jpg'), cpu: 'Core i5-14600K', gpu: 'RTX 4060 Ti', use: 'شبیه‌ساز و ریسینگ', product: 'vista-34' }
];

export const services = [
  { icon: 'headset', title: 'مشاوره تخصصی خرید', text: 'پیش از خرید، کارشناسان ما بر اساس بودجه و نوع کارتان بهترین گزینه را پیشنهاد می‌دهند.', cta: 'گفتگو با کارشناس' },
  { icon: 'shield', title: 'ضمانت اصالت کالا', text: 'تمامی محصولات با کد رهگیری و گارانتی معتبر و تضمین هفت روزه بازگشت عرضه می‌شوند.', cta: 'شرایط گارانتی' },
  { icon: 'wrench', title: 'ارتقا و تعمیر تخصصی', text: 'ارتقای رم و SSD، تعویض خمیر سیلیکون و سرویس دوره‌ای در کارگاه مجهز آرنوتک.', cta: 'ثبت درخواست' },
  { icon: 'truck', title: 'ارسال سریع و بیمه‌شده', text: 'ارسال همان‌روز در تهران و ۲۴ تا ۷۲ ساعته به سراسر کشور با بسته‌بندی ضدضربه.', cta: 'پیگیری سفارش' }
];

export const steps = [
  { title: 'انتخاب یا مشاوره', text: 'محصول را از فروشگاه انتخاب کنید یا با کارشناسان ما برای پیکربندی سفارشی گفتگو کنید.', icon: 'message' },
  { title: 'ثبت و پرداخت امن', text: 'سفارش را با درگاه امن پرداخت یا اقساط بدون ضامن نهایی کنید و کد رهگیری بگیرید.', icon: 'card' },
  { title: 'تست و بسته‌بندی', text: 'هر دستگاه پیش از ارسال تست سلامت می‌شود و در جعبه ضدضربه و پلمپ بسته‌بندی می‌گردد.', icon: 'box' },
  { title: 'تحویل و پشتیبانی', text: 'مرسوله را تحویل بگیرید؛ از این لحظه پشتیبانی و گارانتی آرنوتک همراه شماست.', icon: 'gift' }
];

export const faqs = [
  { q: 'آیا محصولات آرنوتک اصل و دارای گارانتی هستند؟', a: 'بله. تمام کالاها با کد رهگیری اصالت، فاکتور رسمی و گارانتی معتبر ۱۸ تا ۲۴ ماهه عرضه می‌شوند. در صورت مغایرت، تا هفت روز امکان بازگشت بدون قید و شرط دارید.' },
  { q: 'چطور لپ‌تاپ مناسب کارم را انتخاب کنم؟', a: 'اگر بیشتر کارهای اداری و دانشجویی دارید، یک اولترابوک با پردازنده نسل جدید و ۱۶ گیگ رم کافی است. برای طراحی، تدوین یا بازی به کارت گرافیک مجزا و نمایشگر با پوشش رنگی بالا نیاز دارید. کارشناسان ما رایگان راهنمایی‌تان می‌کنند.' },
  { q: 'امکان خرید اقساطی وجود دارد؟', a: 'بله، خرید اقساطی ۳ تا ۱۲ ماهه بدون ضامن و با چک صیادی یا اعتبار بانکی امکان‌پذیر است. جزئیات در مرحله پرداخت نمایش داده می‌شود.' },
  { q: 'ارسال سفارش چقدر طول می‌کشد؟', a: 'سفارش‌های تهران تا ساعت ۱۴ همان روز ارسال می‌شوند. سایر شهرها بین ۲۴ تا ۷۲ ساعت کاری با پست پیشتاز یا تیپاکس بیمه‌شده دریافت می‌کنند.' },
  { q: 'آیا ارتقای رم و SSD لپ‌تاپ را انجام می‌دهید؟', a: 'بله. در کارگاه آرنوتک ارتقا با قطعات اصل و بدون آسیب به گارانتی دستگاه انجام می‌شود و معمولا کمتر از یک ساعت زمان می‌برد.' }
];

export const branches = [
  { city: 'تهران', label: 'شعبه مرکزی', addr: 'خیابان ولیعصر، بالاتر از پارک ساعی، مجتمع آرنو', x: 47, y: 33 },
  { city: 'مشهد', label: 'شعبه شرق', addr: 'بلوار سجاد، مجتمع تجاری الماس', x: 78, y: 30 },
  { city: 'اصفهان', label: 'شعبه مرکز', addr: 'خیابان چهارباغ بالا، پاساژ نور', x: 46, y: 55 },
  { city: 'شیراز', label: 'شعبه جنوب', addr: 'خیابان ملاصدرا، مرکز خرید پارس', x: 50, y: 74 },
  { city: 'تبریز', label: 'شعبه شمال‌غرب', addr: 'خیابان امام، پاساژ صبا', x: 20, y: 18 }
];
