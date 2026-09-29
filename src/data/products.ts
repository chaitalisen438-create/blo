export interface Product {
  id: string;
  name: string;
  bengaliName: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  images: string[];
  sizes: string[];
  colours: { name: string; hex: string }[];
  fabric: string;
  neckDesign: string;
  sleeveStyle: string;
  pattern: string;
  careInstructions: string;
  deliveryInfo: string;
  returnPolicy: string;
  details: string;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "shyama-embroidered-silk",
    name: "Shyama Embroidered Silk Blouse",
    bengaliName: "শ্যামা এমব্রয়ডারি সিল্ক ব্লাউজ",
    category: "Designer Blouses",
    price: 1399,
    originalPrice: 1999,
    discount: 30,
    rating: 4.9,
    reviewCount: 48,
    images: [
      "/src/assets/images/boutique_embroidery_1790685710547.jpg",
      "/src/assets/images/back_design_blouse_1790685813140.jpg",
      "/src/assets/images/v_neck_blouse_1790685786464.jpg"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colours: [
      { name: "Crimson Red", hex: "#62141C" },
      { name: "Antique Gold", hex: "#C5A059" },
      { name: "Royal Blue", hex: "#1D4ED8" }
    ],
    fabric: "Pure Banarasi Raw Silk",
    neckDesign: "Elegant Deep V-Neck",
    sleeveStyle: "Elbow Length with Zari Border",
    pattern: "Intricate Hand-Embroidered Floral Zardozi and Beadwork",
    careInstructions: "Dry Clean Only. Iron on reverse side under a protective cloth.",
    deliveryInfo: "Ships within 24-48 hours. Express delivery available across India.",
    returnPolicy: "Hassle-free 7-day exchange or return.",
    details: "Crafted with the finest Raw Silk and hand-decorated by master artisans in Kolkata, this piece features magnificent gold zari threads and delicate beadwork. Designed to complement rich Banarasi and Kanjeevaram sarees.",
    isBestSeller: true,
    isNewArrival: false
  },
  {
    id: "kolkata-heritage-banarasi",
    name: "Kolkata Heritage Banarasi Blouse",
    bengaliName: "কলকাতা হেরিটেজ বেনারসী ব্লাউজ",
    category: "Wedding Collection",
    price: 1799,
    originalPrice: 2499,
    discount: 28,
    rating: 5.0,
    reviewCount: 64,
    images: [
      "/src/assets/images/wedding_collection_1790685754130.jpg",
      "/src/assets/images/full_sleeve_blouse_1790685845103.jpg",
      "/src/assets/images/category_traditional_silk_1790685724914.jpg"
    ],
    sizes: ["S", "M", "L", "XL"],
    colours: [
      { name: "Sindoor Red", hex: "#B91C1C" },
      { name: "Maroon-Gold", hex: "#4C0519" }
    ],
    fabric: "Premium Silk Katan",
    neckDesign: "Classic Round Neck with Sweetheart Outline",
    sleeveStyle: "Elbow-Length Royal Sleeves",
    pattern: "All-Over Brocade Boota & Dense Zari Border",
    careInstructions: "Dry Clean Only. Store wrapped in soft muslin cloth.",
    deliveryInfo: "Ships within 2-3 business days. Secure luxury packaging included.",
    returnPolicy: "7-day return option. Free reverse pickup.",
    details: "The ultimate bridal statement blouse. This authentic Katan Banarasi brocade masterpiece is woven with real metallic threads. Its heavy gold motifs and flawless silhouette make it perfect for Bengali brides.",
    isBestSeller: true,
    isNewArrival: true
  },
  {
    id: "sondhya-organza-designer",
    name: "Sondhya Organza Velvet Designer Blouse",
    bengaliName: "সন্ধ্যা অর্গানজা ডিজাইনার ব্লাউজ",
    category: "Designer Blouses",
    price: 1499,
    originalPrice: 1999,
    discount: 25,
    rating: 4.8,
    reviewCount: 32,
    images: [
      "/src/assets/images/designer_partywear_1790685773478.jpg",
      "/src/assets/images/sleeveless_blouse_1790685831328.jpg",
      "/src/assets/images/hero_bengali_model_2_1790685696791.jpg"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colours: [
      { name: "Midnight Black", hex: "#000000" },
      { name: "Wine Red", hex: "#3A0A0E" }
    ],
    fabric: "Premium Micro-Velvet and Sheer Organza",
    neckDesign: "High Neck with Delicate Keyhole",
    sleeveStyle: "Sheer Sleeveless / Illusion Neckline",
    pattern: "Minimalist Modern Cut with Designer Tassels",
    careInstructions: "Dry Clean recommended. Gentle hand wash inside out.",
    deliveryInfo: "Immediate dispatch. Delivery in 3-5 business days.",
    returnPolicy: "7-day exchange or refund if tags are intact.",
    details: "A breathtaking marriage of traditional velvet and contemporary sheer organza. This high-neck designer piece features a gorgeous front keyhole and an open back with luxurious matching ties, perfect for glamorous evening parties.",
    isBestSeller: false,
    isNewArrival: true
  },
  {
    id: "alpona-handloom-cotton",
    name: "Alpona Puff-Sleeve Handloom Blouse",
    bengaliName: "আলপনা হ্যান্ডলুম সুতি ব্লাউজ",
    category: "Cotton Blouses",
    price: 899,
    originalPrice: 1199,
    discount: 25,
    rating: 4.7,
    reviewCount: 52,
    images: [
      "/src/assets/images/category_festive_cotton_1790685736658.jpg",
      "/src/assets/images/boat_neck_blouse_1790685800912.jpg",
      "/src/assets/images/high_neck_blouse_1790685854474.jpg"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colours: [
      { name: "Mustard Yellow", hex: "#CA8A04" },
      { name: "Earthy Terracotta", hex: "#C2410C" },
      { name: "Indigo Blue", hex: "#1E3A8A" }
    ],
    fabric: "100% Organic Handloom Cotton",
    neckDesign: "Chic Boat Neck",
    sleeveStyle: "Vintage Victorian Puff Sleeves",
    pattern: "Traditional Alpona Block-Print with Contrast Piping",
    careInstructions: "Hand wash separately in cold water using mild liquid detergent.",
    deliveryInfo: "Ships within 24 hours. Eco-friendly plastic-free packaging.",
    returnPolicy: "Easy 7-day hassle-free returns.",
    details: "Celebrate summer and festive seasons in absolute comfort. Made from pure hand-spun cotton, this blouse boasts playful Victorian puff sleeves and a sophisticated boat neck. Ideal for coupling with Dhakai Jamdanis or linen sarees.",
    isBestSeller: true,
    isNewArrival: false
  },
  {
    id: "aparajita-v-neck-silk",
    name: "Aparajita Deep V-Neck Embroidered Blouse",
    bengaliName: "অপরাজিতা ভি-নেক এমব্রয়ডারি ব্লাউজ",
    category: "Party Wear Blouses",
    price: 1299,
    originalPrice: 1799,
    discount: 27,
    rating: 4.9,
    reviewCount: 29,
    images: [
      "/src/assets/images/v_neck_blouse_1790685786464.jpg",
      "/src/assets/images/boutique_embroidery_1790685710547.jpg",
      "/src/assets/images/back_design_blouse_1790685813140.jpg"
    ],
    sizes: ["S", "M", "L", "XL"],
    colours: [
      { name: "Emerald Green", hex: "#065F46" },
      { name: "Deep Ruby", hex: "#991B1B" }
    ],
    fabric: "Pure Mulberry Silk",
    neckDesign: "Modern Deep Plunging V-Neck",
    sleeveStyle: "Half Sleeves",
    pattern: "Exquisite Handcrafted Floral Border and Sequin Embellishments",
    careInstructions: "Dry Clean Only. Avoid direct sunlight drying.",
    deliveryInfo: "Shipped in custom rigid designer boxes. Quick transit.",
    returnPolicy: "7-day replacement guarantee.",
    details: "Designed with modern sensuality and traditional grace. The stunning plunging V-neckline is beautifully paired with delicate hand-embroidered vine borders along the sleeves and neckline. Elevates any solid color chiffon or georgette saree.",
    isBestSeller: false,
    isNewArrival: true
  },
  {
    id: "basanti-traditional-cotton",
    name: "Basanti Puff-Sleeve Handloom Cotton Blouse",
    bengaliName: "বাসন্তী ঘটিহাতা সুতি ব্লাউজ",
    category: "Cotton Blouses",
    price: 799,
    originalPrice: 1099,
    discount: 27,
    rating: 4.6,
    reviewCount: 41,
    images: [
      "/src/assets/images/boat_neck_blouse_1790685800912.jpg",
      "/src/assets/images/category_festive_cotton_1790685736658.jpg",
      "/src/assets/images/sleeveless_blouse_1790685831328.jpg"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colours: [
      { name: "Marigold Yellow", hex: "#EAB308" },
      { name: "Forest Green", hex: "#064E3B" }
    ],
    fabric: "Khadi Cotton Blend",
    neckDesign: "Classic Mandarin Collar with Open Back V",
    sleeveStyle: "Traditional Puff / 'Ghoti Hata'",
    pattern: "Subtle woven checks with antique brass button front",
    careInstructions: "Wash with like colors, gentle cycle, dry in shade.",
    deliveryInfo: "Dispatched within 24 hours.",
    returnPolicy: "7-day return policy.",
    details: "A classic Bengali favorite reimagined for the modern boutique. The traditional puff-sleeves (affectionately known as Ghoti Hata) are lined with a soft lining. Excellent for matching with red-bordered cotton Tant sarees during Durga Puja.",
    isBestSeller: false,
    isNewArrival: false
  },
  {
    id: "shefali-sleeveless-floral",
    name: "Shefali Chic Sleeveless Blouse",
    bengaliName: "শেফালী স্লিভলেস ফ্লোরাল ব্লাউজ",
    category: "Sleeveless Blouse",
    price: 999,
    originalPrice: 1399,
    discount: 28,
    rating: 4.8,
    reviewCount: 37,
    images: [
      "/src/assets/images/sleeveless_blouse_1790685831328.jpg",
      "/src/assets/images/designer_partywear_1790685773478.jpg",
      "/src/assets/images/v_neck_blouse_1790685786464.jpg"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colours: [
      { name: "Chalk Ivory", hex: "#F3F4F6" },
      { name: "Dusky Peach", hex: "#FDBA74" }
    ],
    fabric: "Premium Printed Linen",
    neckDesign: "Contemporary Collar Neck with Sleeveless Cut",
    sleeveStyle: "Sleeveless / Clean Armhole Finish",
    pattern: "Chic Handcrafted Floral Block Print with Golden Piping",
    careInstructions: "Cold hand wash. Do not wring.",
    deliveryInfo: "Ships within 48 hours. Secure tracker included.",
    returnPolicy: "Easy exchange if size does not fit.",
    details: "Exude fresh, contemporary elegance. Featuring an ultra-comfortable summer-ready linen weave with premium inner lining, a smart collar neck, and elegant back buttons, this sleeveless wonder pairs perfectly with contemporary drapes.",
    isBestSeller: false,
    isNewArrival: true
  },
  {
    id: "rajkumari-velvet-zardozi",
    name: "Rajkumari Velvet Zardozi Blouse",
    bengaliName: "রাজকুমারী মখমল জারদৌসি ব্লাউজ",
    category: "Wedding Collection",
    price: 1999,
    originalPrice: 2799,
    discount: 28,
    rating: 4.9,
    reviewCount: 56,
    images: [
      "/src/assets/images/full_sleeve_blouse_1790685845103.jpg",
      "/src/assets/images/wedding_collection_1790685754130.jpg",
      "/src/assets/images/boutique_embroidery_1790685710547.jpg"
    ],
    sizes: ["S", "M", "L", "XL"],
    colours: [
      { name: "Royal Maroon", hex: "#4C0519" },
      { name: "Royal Navy", hex: "#1E3A8A" }
    ],
    fabric: "Luxurious Micro-Velvet",
    neckDesign: "High Royal Band Collar",
    sleeveStyle: "Elegant Full Sleeves with Heavy Cuff Embroidery",
    pattern: "Exquisite Gold Zardozi, Beadwork, and Gota Patti Borders",
    careInstructions: "Strictly Dry Clean. Wrap in a cotton bag to preserve embroidery.",
    deliveryInfo: "Ships in premium velvet-lined keepsake boxes.",
    returnPolicy: "7-day return, custom alterations support available.",
    details: "Nothing speaks of luxury like royal velvet. Featuring elaborate gold metallic zardozi on the high collar and wide wrist cuffs, this magnificent piece wraps your skin in pure comfort while adding a regal layer to your heirloom silk sarees.",
    isBestSeller: true,
    isNewArrival: false
  },
  {
    id: "kasturi-highneck-keyhole",
    name: "Kasturi High-Neck Embroidered Blouse",
    bengaliName: "কস্তুরী হাই-নেক এমব্রয়ডারি ব্লাউজ",
    category: "Traditional Blouses",
    price: 1199,
    originalPrice: 1599,
    discount: 25,
    rating: 4.8,
    reviewCount: 45,
    images: [
      "/src/assets/images/high_neck_blouse_1790685854474.jpg",
      "/src/assets/images/category_traditional_silk_1790685724914.jpg",
      "/src/assets/images/boat_neck_blouse_1790685800912.jpg"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colours: [
      { name: "Pristine White", hex: "#FFFFFF" },
      { name: "Crimson Red", hex: "#62141C" }
    ],
    fabric: "Authentic Chanderi Cotton Silk",
    neckDesign: "High Neck with Delicate Keyhole Back",
    sleeveStyle: "Elbow-Length Designer Puff",
    pattern: "Hand-crafted Kasuti embroidery and fabric-covered buttons",
    careInstructions: "Gentle wash in cold water or dry clean to maintain structure.",
    deliveryInfo: "Dispatched within 24-48 hours. Express option available.",
    returnPolicy: "7-day exchange or refund.",
    details: "The perfect balance of sophisticated structure and timeless charm. Made with Chanderi silk, this high-neck masterpiece is decorated with traditional embroidery and features a beautiful back keyhole with handcrafted fabric buttons.",
    isBestSeller: false,
    isNewArrival: false
  },
  {
    id: "banalata-jamdani-border",
    name: "Banalata Jamdani Accent Blouse",
    bengaliName: "বনলতা জামদানি অ্যাকসেন্ট ব্লাউজ",
    category: "Traditional Blouses",
    price: 1099,
    originalPrice: 1499,
    discount: 26,
    rating: 4.7,
    reviewCount: 39,
    images: [
      "/src/assets/images/category_traditional_silk_1790685724914.jpg",
      "/src/assets/images/hero_bengali_model_2_1790685696791.jpg",
      "/src/assets/images/category_festive_cotton_1790685736658.jpg"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colours: [
      { name: "Royal Blue", hex: "#1E3A8A" },
      { name: "Teal Green", hex: "#0F766E" }
    ],
    fabric: "Mulberry Silk with Cotton Lining",
    neckDesign: "Traditional Sweetheart Neck",
    sleeveStyle: "Elbow Length",
    pattern: "Authentic Jamdani Loom-Woven Border Sleeves",
    careInstructions: "Dry clean only. Gentle ironing on reverse side.",
    deliveryInfo: "Ships with detailed weave description certificate.",
    returnPolicy: "7-day easy returns.",
    details: "Inspired by the classic poetic charm of Bengal, this blouse features pure mulberry silk fabric coupled with hand-loomed Jamdani cotton-silk borders beautifully accentuating the sleeves. Designed to create a cohesive luxury look.",
    isBestSeller: false,
    isNewArrival: false
  },
  {
    id: "kalyani-royal-brocade",
    name: "Kalyani Royal Brocade Silk Blouse",
    bengaliName: "কল্যাণী রয়েল ব্রোকেড সিল্ক ব্লাউজ",
    category: "Silk Blouses",
    price: 1599,
    originalPrice: 2299,
    discount: 30,
    rating: 4.9,
    reviewCount: 61,
    images: [
      "/src/assets/images/hero_bengali_model_1_1790685682423.jpg",
      "/src/assets/images/wedding_collection_1790685754130.jpg",
      "/src/assets/images/boutique_embroidery_1790685710547.jpg"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colours: [
      { name: "Garnet Maroon", hex: "#62141C" },
      { name: "Royal Purple", hex: "#581C87" }
    ],
    fabric: "Genuine Kanjeevaram Brocade Silk",
    neckDesign: "Deep Princess Cut Cut-Out",
    sleeveStyle: "3/4th Elegant Sleeves",
    pattern: "Golden Zari weaves of traditional paisley and peacock motifs",
    careInstructions: "Store in breathable bags. Dry clean to maintain silk luster.",
    deliveryInfo: "Premium boutique shipping with trackable status.",
    returnPolicy: "Hassle-free 7-day exchange.",
    details: "This pure brocade masterpiece represents the golden legacy of Indian weaving. Every inch is covered with intricate gold zari brocade, boasting traditional motifs designed to match high-value wedding Banarasis, Kanjeevarams, and pure silks.",
    isBestSeller: true,
    isNewArrival: false
  },
  {
    id: "nandini-backless-tassel",
    name: "Nandini Backless Tassel Designer Blouse",
    bengaliName: "নন্দিনী ব্যাকলেস ট্যাসেল ব্লাউজ",
    category: "Designer Blouses",
    price: 1399,
    originalPrice: 1899,
    discount: 26,
    rating: 4.9,
    reviewCount: 43,
    images: [
      "/src/assets/images/back_design_blouse_1790685813140.jpg",
      "/src/assets/images/v_neck_blouse_1790685786464.jpg",
      "/src/assets/images/designer_partywear_1790685773478.jpg"
    ],
    sizes: ["S", "M", "L", "XL"],
    colours: [
      { name: "Burgundy Red", hex: "#7F1D1D" },
      { name: "Pure Gold", hex: "#D4AF37" }
    ],
    fabric: "Premium Georgette Silk",
    neckDesign: "Exquisite Round Neck Front, Open-Back Tie",
    sleeveStyle: "Elbow Length Sleek",
    pattern: "Backless Cut with Dual Drawstrings and Heavy Handmade Bead Tassels",
    careInstructions: "Wash carefully in cold water or dry clean. Do not rub tassels.",
    deliveryInfo: "Shipped in 24 hours. Transit time 3-5 days.",
    returnPolicy: "Easy 7-day exchange and returns.",
    details: "Turn heads with the gorgeous back details of the Nandini blouse. Crafted from fluid premium georgette, its front is clean and classic, while the back features double-drawstring ties anchored with exquisite Kolkata handmade tassels.",
    isBestSeller: false,
    isNewArrival: true
  },
  {
    id: "sleeveless-black-red",
    name: "Shyama Sleeveless Black & Red Blouse",
    bengaliName: "লাল শাড়িতে আধুনিক আভিজাত্য ব্লাউজ",
    category: "Sleeveless Blouse",
    price: 1199,
    originalPrice: 1699,
    discount: 29,
    rating: 4.9,
    reviewCount: 42,
    images: [
      "/src/assets/images/sleeveless_black_red_saree_1790687247329.jpg",
      "/src/assets/images/sleeveless_red_white_saree_1790687262956.jpg"
    ],
    sizes: ["S", "M", "L", "XL"],
    colours: [{ name: "Midnight Black", hex: "#000000" }],
    fabric: "Premium Raw Silk",
    neckDesign: "Stylishly Cut Round Neck",
    sleeveStyle: "Elegant Sleeveless",
    pattern: "Luxury hand-guided minimalist border stitching",
    careInstructions: "Dry Clean Only.",
    deliveryInfo: "Ships within 24 hours.",
    returnPolicy: "7-day exchange.",
    details: "As featured in our cinematic reels. An elegant black sleeveless blouse crafted to contrast brilliantly with gorgeous crimson red sarees.",
    isNewArrival: true
  },
  {
    id: "traditional-blouse",
    name: "Traditional Garad Sleeveless Blouse",
    bengaliName: "বাঙালিয়ানার চিরন্তন সৌন্দর্য ব্লাউজ",
    category: "Sleeveless Blouse",
    price: 1099,
    originalPrice: 1499,
    discount: 26,
    rating: 5.0,
    reviewCount: 31,
    images: [
      "/src/assets/images/sleeveless_red_white_saree_1790687262956.jpg",
      "/src/assets/images/sleeveless_black_red_saree_1790687247329.jpg"
    ],
    sizes: ["S", "M", "L", "XL"],
    colours: [{ name: "Sindoor Red", hex: "#B91C1C" }],
    fabric: "Pure Tussar Silk",
    neckDesign: "Classic Deep U-Neck",
    sleeveStyle: "Elegant Sleeveless",
    pattern: "Zari lined borders",
    careInstructions: "Gentle wash.",
    deliveryInfo: "Ships within 24 hours.",
    returnPolicy: "7-day easy returns.",
    details: "Deep red pure silk sleeveless design. Created explicitly to complement traditional red-and-white borders for festive celebrations like Durga Puja.",
    isNewArrival: true
  },
  {
    id: "black-gold-blouse",
    name: "Midnight Gold Royal Sleeveless Blouse",
    bengaliName: "কালো ও সোনালির রাজকীয় সাজ ব্লাউজ",
    category: "Sleeveless Blouse",
    price: 1399,
    originalPrice: 1999,
    discount: 30,
    rating: 4.8,
    reviewCount: 29,
    images: [
      "/src/assets/images/sleeveless_gold_black_saree_1790687279715.jpg",
      "/src/assets/images/sleeveless_black_red_saree_1790687247329.jpg"
    ],
    sizes: ["S", "M", "L", "XL"],
    colours: [{ name: "Gold Brocade", hex: "#D4AF37" }],
    fabric: "Katan Banarasi Silk",
    neckDesign: "Modern High Keyhole Neck",
    sleeveStyle: "Elegant Sleeveless",
    pattern: "Floral Brocade Golden Motifs",
    careInstructions: "Dry Clean Only.",
    deliveryInfo: "Ships within 24-48 hours.",
    returnPolicy: "7-day easy exchange.",
    details: "Premium metallic thread gold brocade sleeveless design, perfectly coupled with heavy black chiffon or silk drapes.",
    isNewArrival: true
  },
  {
    id: "pastel-blouse",
    name: "Pastel Pink Blossom Sleeveless Blouse",
    bengaliName: "প্যাস্টেল রঙে কোমল সৌন্দর্য ব্লাউজ",
    category: "Sleeveless Blouse",
    price: 999,
    originalPrice: 1399,
    discount: 28,
    rating: 4.9,
    reviewCount: 25,
    images: [
      "/src/assets/images/sleeveless_pink_pastel_saree_1790687293037.jpg",
      "/src/assets/images/sleeveless_organza_pastel_saree_1790687346024.jpg"
    ],
    sizes: ["S", "M", "L", "XL"],
    colours: [{ name: "Pastel Pink", hex: "#FDBA74" }],
    fabric: "Premium Organza Silk",
    neckDesign: "Modern Sweetheart Neck",
    sleeveStyle: "Elegant Sleeveless",
    pattern: "Handcrafted delicate floral embroidery on pastel base",
    careInstructions: "Gentle Hand Wash.",
    deliveryInfo: "Ships in 24 hours.",
    returnPolicy: "7-day doorstep return.",
    details: "Soft pastel luxury. Features delicate floral hand-embroidery over fine organza silk, with cotton lining for breezy comfort.",
    isNewArrival: true
  },
  {
    id: "blue-designer-blouse",
    name: "Blue Sweetheart Contrast Sleeveless Blouse",
    bengaliName: "নীলের ছোঁয়ায় স্টাইলিশ আপনি ব্লাউজ",
    category: "Sleeveless Blouse",
    price: 1299,
    originalPrice: 1799,
    discount: 27,
    rating: 4.8,
    reviewCount: 34,
    images: [
      "/src/assets/images/sleeveless_contrast_blue_saree_1790687306145.jpg",
      "/src/assets/images/sleeveless_organza_pastel_saree_1790687346024.jpg"
    ],
    sizes: ["S", "M", "L", "XL"],
    colours: [{ name: "Contrast Pink", hex: "#DB2777" }],
    fabric: "Pure Mulberry Silk",
    neckDesign: "Princess Cut Sweetheart",
    sleeveStyle: "Elegant Sleeveless",
    pattern: "Exquisite back tassel loops",
    careInstructions: "Dry clean suggested.",
    deliveryInfo: "Ships in 24-48 hours.",
    returnPolicy: "7-day returns.",
    details: "Contrasting pink raw silk sleeves design with royal blue borders to stand out gracefully in all high-fashion events.",
    isNewArrival: true
  },
  {
    id: "handloom-blouse",
    name: "Forest Green Silk Heritage Sleeveless Blouse",
    bengaliName: "ঐতিহ্যের সঙ্গে আধুনিকতার মেলবন্ধন ব্লাউজ",
    category: "Sleeveless Blouse",
    price: 1199,
    originalPrice: 1599,
    discount: 25,
    rating: 4.7,
    reviewCount: 22,
    images: [
      "/src/assets/images/sleeveless_green_silk_saree_1790687318256.jpg",
      "/src/assets/images/sleeveless_handloom_saree_1790687358046.jpg"
    ],
    sizes: ["S", "M", "L", "XL"],
    colours: [{ name: "Emerald Green", hex: "#065F46" }],
    fabric: "Mulberry Silk",
    neckDesign: "Sophisticated Collar Neck",
    sleeveStyle: "Elegant Sleeveless",
    pattern: "Subtle check weaves",
    careInstructions: "Wash with mild detergent.",
    deliveryInfo: "Ships in 24 hours.",
    returnPolicy: "7-day return policy.",
    details: "Features rich emerald mulberry silk with classic check weaves. Designed in Kolkata for traditional family heritage get-togethers.",
    isNewArrival: true
  },
  {
    id: "festive-blouse",
    name: "Royal Gold Banarasi Sleeveless Blouse",
    bengaliName: "উৎসবের সাজে রাজকীয় আভা ব্লাউজ",
    category: "Sleeveless Blouse",
    price: 1499,
    originalPrice: 2099,
    discount: 28,
    rating: 4.9,
    reviewCount: 45,
    images: [
      "/src/assets/images/sleeveless_maroon_banarasi_saree_1790687332545.jpg",
      "/src/assets/images/sleeveless_festive_close_up_saree_1790687371019.jpg"
    ],
    sizes: ["S", "M", "L", "XL"],
    colours: [{ name: "Rich Gold", hex: "#C5A059" }],
    fabric: "Pure Silk Brocade",
    neckDesign: "Graceful Boat Neck",
    sleeveStyle: "Elegant Sleeveless",
    pattern: "Zardozi handcrafted metallic brocade",
    careInstructions: "Dry Clean Only.",
    deliveryInfo: "Ships within 24-48 hours.",
    returnPolicy: "7-day returns.",
    details: "Dazzling luxury. Handcrafted gold zardozi motifs woven on a premium silk base make this the perfect choice for grand weddings.",
    isNewArrival: true
  },
  {
    id: "modern-sleeveless-blouse",
    name: "Organza Petal Hand-Embroidered Sleeveless Blouse",
    bengaliName: "অর্গানজার সঙ্গে আধুনিক ডিজাইন ব্লাউজ",
    category: "Sleeveless Blouse",
    price: 1299,
    originalPrice: 1799,
    discount: 27,
    rating: 4.9,
    reviewCount: 19,
    images: [
      "/src/assets/images/sleeveless_organza_pastel_saree_1790687346024.jpg",
      "/src/assets/images/sleeveless_pink_pastel_saree_1790687293037.jpg"
    ],
    sizes: ["S", "M", "L", "XL"],
    colours: [{ name: "Pristine White", hex: "#FFFFFF" }],
    fabric: "Premium Georgette Silk",
    neckDesign: "Modern V-Neck",
    sleeveStyle: "Elegant Sleeveless",
    pattern: "Floral hand-woven sequin petals",
    careInstructions: "Hand wash with care.",
    deliveryInfo: "Ships in 24 hours.",
    returnPolicy: "7-day exchange policy.",
    details: "Lightweight and airy modern georgette. Adorned with delicate sequin floral patterns that pair perfectly with breezy designer organza drapes.",
    isNewArrival: true
  },
  {
    id: "bengali-handloom-blouse",
    name: "Indigo Block Handloom Sleeveless Blouse",
    bengaliName: "হ্যান্ডলুমে বাংলার নিজস্ব সৌন্দর্য ব্লাউজ",
    category: "Sleeveless Blouse",
    price: 899,
    originalPrice: 1199,
    discount: 25,
    rating: 4.7,
    reviewCount: 28,
    images: [
      "/src/assets/images/sleeveless_handloom_saree_1790687358046.jpg",
      "/src/assets/images/sleeveless_green_silk_saree_1790687318256.jpg"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colours: [{ name: "Indigo Blue", hex: "#1E3A8A" }],
    fabric: "100% Khadi Cotton",
    neckDesign: "Chic Collar V-Neck",
    sleeveStyle: "Elegant Sleeveless",
    pattern: "Artisanal hand block indigo prints",
    careInstructions: "Wash separately in cold water.",
    deliveryInfo: "Dispatched in 24 hours.",
    returnPolicy: "7-day returns.",
    details: "Handloomed with authentic organic cotton. Decorated with historical Bengali hand-printed indigo dyes to exude traditional charm.",
    isNewArrival: true
  },
  {
    id: "premium-festive-blouse",
    name: "Emerald Gold Threaded Sleeveless Blouse",
    bengaliName: "প্রতিটি উৎসবে হোক নতুন সাজ ব্লাউজ",
    category: "Sleeveless Blouse",
    price: 1399,
    originalPrice: 1899,
    discount: 26,
    rating: 5.0,
    reviewCount: 37,
    images: [
      "/src/assets/images/sleeveless_festive_close_up_saree_1790687371019.jpg",
      "/src/assets/images/sleeveless_maroon_banarasi_saree_1790687332545.jpg"
    ],
    sizes: ["S", "M", "L", "XL"],
    colours: [{ name: "Emerald Green", hex: "#065F46" }],
    fabric: "Mulberry Silk",
    neckDesign: "High Neck Cut-Out Back",
    sleeveStyle: "Elegant Sleeveless",
    pattern: "Royal gold-thread lace borders",
    careInstructions: "Dry Clean Only.",
    deliveryInfo: "Ships within 24 hours.",
    returnPolicy: "7-day easy exchange.",
    details: "Exquisite hand-threaded gold lace trims paired with high-quality emerald mulberry silk. An absolute festive head-turner.",
    isNewArrival: true
  }
];

export const CATEGORIES = [
  "All Blouses",
  "Designer Blouses",
  "Ready-Made Blouses",
  "Party Wear Blouses",
  "Traditional Blouses",
  "Wedding Collection",
  "Festive Collection",
  "Cotton Blouses",
  "Silk Blouses",
  "Sleeveless Blouse",
  "Embroidered Blouses"
];

export const CATEGORIES_WITH_IMAGES = [
  {
    name: "Designer Blouses",
    image: "/src/assets/images/boutique_embroidery_1790685710547.jpg",
    desc: "Intricately hand-embroidered custom patterns"
  },
  {
    name: "Traditional Blouses",
    image: "/src/assets/images/category_traditional_silk_1790685724914.jpg",
    desc: "Brocades, Katan Silks and Heritage weaves"
  },
  {
    name: "Cotton Blouses",
    image: "/src/assets/images/category_festive_cotton_1790685736658.jpg",
    desc: "Eco-friendly, lightweight breathable handlooms"
  },
  {
    name: "Wedding Collection",
    image: "/src/assets/images/wedding_collection_1790685754130.jpg",
    desc: "Heavy gold embroidery and royal silhouettes"
  },
  {
    name: "Festive Collection",
    image: "/src/assets/images/hero_bengali_model_1_1790685682423.jpg",
    desc: "Dazzling styles crafted for celebrations"
  },
  {
    name: "Sleeveless Blouse",
    image: "/src/assets/images/sleeveless_blouse_1790685831328.jpg",
    desc: "Chic modern necklines for summer drapes"
  }
];
