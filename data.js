// Store Data for Om Sai Kirana Store, Belwandi Bk.
const STORE_DATA = {
    info: {
        name: "ओम साई किराणा स्टोअर्स",
        nameEn: "Om Sai Kirana Store",
        tagline: "बेलवंडीतील एक नावाजलेले व उत्तम किराणा मालाचे होलसेल व्यापारी!",
        taglineEn: "Wholesale & Retail Grocery Superstore in Belwandi Bk.",
        phone: "919876543210",
        displayPhone: "+91 98765 43210",
        address: "शिरूर-श्रीगोंदा रोड, बस स्टँडजवळ, बेलवंडी बुद्रुक, ता. श्रीगोंदा, जि. अहिल्यानगर (अहमदनगर) - ४१३७०२",
        targetPincode: "413702",
        mapQuery: "Shirur+Shrigonda+Road+near+Bus+Stand+Belwandi+Bk+413702",
        mapEmbedUrl: "https://maps.google.com/maps?q=Belwandi+Bk+Bus+Stand+Maharashtra&t=&z=15&ie=UTF8&iwloc=&output=embed",
        timings: "सकाळी ७:०० ते रात्री ९:३० पर्यंत चालू (दररोज)",
        rating: "5.0",
        totalReviews: "120+"
    },
    reviews: [
        {
            id: 1,
            name: "संकेत सांगळे (Sanket Sangale)",
            rating: 5,
            date: "गुगल ५-स्टार व्हेरिफाईड रिव्ह्यू",
            badge: "होलसेल व्यापारी ग्राहक",
            text: "बेलवंडीतील एक नावाजलेले व उत्तम सर्व प्रकारच्या किराणा मालाचे होलसेल व्यापारी ओम साई किराणा."
        },
        {
            id: 2,
            name: "निवास शिंदे (Niwas Shinde)",
            rating: 5,
            date: "गुगल ५-स्टार व्हेरिफाईड रिव्ह्यू",
            badge: "स्थानिक नियमित ग्राहक",
            text: "फारच छान अनुभव. सर्व किराणा माल स्वच्छ आणि ताजा असतो. मालकांचे बोलणे अतिशय आदरयुक्त आहे आणि घरपोच डिलिव्हरी सुद्धा वेळेवर देतात. ५ स्टार!"
        },
        {
            id: 3,
            name: "गणेश पवार (Ganesh Pawar)",
            rating: 5,
            date: "स्थानिक रहिवासी",
            badge: "लग्नकार्य व बल्क खरेदी",
            text: "लग्नकार्य आणि घरगुती कार्यक्रमांसाठी लागणारा मोठा किराणा आम्ही इथूनच घेतो. एकाच छताखाली सर्व वस्तू योग्य होलसेल भावात मिळतात."
        }
    ],
    categories: [
        { id: "all", name: "सर्व वस्तू", icon: "shopping-bag" },
        { id: "grains", name: "अन्नधान्य व तांदूळ", icon: "wheat" },
        { id: "pulses", name: "डाळी व कडधान्ये", icon: "layers" },
        { id: "oil", name: "खाद्यतेल व तूप", icon: "droplet" },
        { id: "spices", name: "मसाले व साखर", icon: "sparkles" },
        { id: "dryfruits", name: "काजू, बदाम (ड्रायफ्रूट्स)", icon: "box" },
        { id: "daily", name: "दैनंदिन वस्तू", icon: "shield-check" }
    ],
    products: [
        {
            id: "p1",
            name: "कोलम स्टीम राईस (Kolam Steam Rice)",
            category: "grains",
            image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=60",
            pricePerKg: 65,
            wholesaleBagKg: 25,
            wholesalePrice: 1450, // ₹58/kg in 25kg sack
            weightPresets: [
                { label: "५०० ग्रॅम", grams: 500 },
                { label: "१ किलो", grams: 1000 },
                { label: "५ किलो", grams: 5000 },
                { label: "२५ किलो पोते (होलसेल)", grams: 25000, isWholesale: true }
            ],
            badge: "होलसेल सवलत"
        },
        {
            id: "p2",
            name: "प्रीमियम बासमती तुकडा (Basmati Tukda)",
            category: "grains",
            image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=500&auto=format&fit=crop&q=60",
            pricePerKg: 80,
            wholesaleBagKg: 30,
            wholesalePrice: 2150,
            weightPresets: [
                { label: "५०० ग्रॅम", grams: 500 },
                { label: "१ किलो", grams: 1000 },
                { label: "५ किलो", grams: 5000 },
                { label: "३० किलो कट्टा (होलसेल)", grams: 30000, isWholesale: true }
            ],
            badge: "लोकप्रिय"
        },
        {
            id: "p3",
            name: "शुद्ध लातूर तूर डाळ (Latur Tur Dal)",
            category: "pulses",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60",
            pricePerKg: 155,
            wholesaleBagKg: 30,
            wholesalePrice: 4250,
            weightPresets: [
                { label: "२५० ग्रॅम", grams: 250 },
                { label: "५०० ग्रॅम", grams: 500 },
                { label: "१ किलो", grams: 1000 },
                { label: "३० किलो पोते (होलसेल)", grams: 30000, isWholesale: true }
            ],
            badge: "लातूर डाळ"
        },
        {
            id: "p4",
            name: "पॉलिश मूग डाळ (Moong Dal)",
            category: "pulses",
            image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=60",
            pricePerKg: 110,
            wholesaleBagKg: 25,
            wholesalePrice: 2500,
            weightPresets: [
                { label: "२५० ग्रॅम", grams: 250 },
                { label: "५०० ग्रॅम", grams: 500 },
                { label: "१ किलो", grams: 1000 },
                { label: "२५ किलो पोते (होलसेल)", grams: 25000, isWholesale: true }
            ],
            badge: ""
        },
        {
            id: "p5",
            name: "फॉर्च्युन शेंगदाणा तेल (Groundnut Oil)",
            category: "oil",
            image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=60",
            pricePerKg: 165, // per litre
            wholesaleBagKg: 15,
            wholesalePrice: 2280, // 15L tin
            weightPresets: [
                { label: "१ लिटर पाऊच", grams: 1000 },
                { label: "५ लिटर कॅन", grams: 5000 },
                { label: "१५ लिटर डबा (होलसेल)", grams: 15000, isWholesale: true }
            ],
            badge: "डबा भाव"
        },
        {
            id: "p6",
            name: "गोवर्धन शुद्ध देशी गायीचे तूप (Pure Cow Ghee)",
            category: "oil",
            image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=500&auto=format&fit=crop&q=60",
            pricePerKg: 620,
            wholesaleBagKg: 15,
            wholesalePrice: 8700,
            weightPresets: [
                { label: "२०० ग्रॅम", grams: 200 },
                { label: "५०० ग्रॅम", grams: 500 },
                { label: "१ किलो", grams: 1000 },
                { label: "१५ लिटर कॅन (होलसेल)", grams: 15000, isWholesale: true }
            ],
            badge: "प्रीमियम"
        },
        {
            id: "p7",
            name: "उत्तम शुद्ध साखर (M30 Clean Sugar)",
            category: "spices",
            image: "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=500&auto=format&fit=crop&q=60",
            pricePerKg: 42,
            wholesaleBagKg: 50,
            wholesalePrice: 1950,
            weightPresets: [
                { label: "१ किलो", grams: 1000 },
                { label: "५ किलो", grams: 5000 },
                { label: "५० किलो पोते (होलसेल)", grams: 50000, isWholesale: true }
            ],
            badge: "होलसेल पोते"
        },
        {
            id: "p8",
            name: "अमेरिकन बदाम व काजू कॉम्बो (Dryfruits)",
            category: "dryfruits",
            image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=60",
            pricePerKg: 880,
            wholesaleBagKg: 10,
            wholesalePrice: 7800,
            weightPresets: [
                { label: "१०० ग्रॅम", grams: 100 },
                { label: "२५० ग्रॅम", grams: 250 },
                { label: "५०० ग्रॅम", grams: 500 },
                { label: "१ किलो", grams: 1000 },
                { label: "१० किलो बॉक्स (होलसेल)", grams: 10000, isWholesale: true }
            ],
            badge: "सण विशेष"
        },
        {
            id: "p9",
            name: "सुपर वॉशिंग पावडर व साबण बंडल",
            category: "daily",
            image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&auto=format&fit=crop&q=60",
            pricePerKg: 90,
            wholesaleBagKg: 12,
            wholesalePrice: 960,
            weightPresets: [
                { label: "५०० ग्रॅम", grams: 500 },
                { label: "१ किलो पॅक", grams: 1000 },
                { label: "१ कार्टन (१२ नग - होलसेल)", grams: 12000, isWholesale: true }
            ],
            badge: ""
        }
    ]
};
