// Store Data for Om Sai Kirana Store, Belwandi
const STORE_DATA = {
    info: {
        name: "ओम साई किराणा स्टोअर्स",
        nameEn: "Om Sai Kirana Store",
        tagline: "बेलवंडीकरांचा विश्वासाचा किराणा व होलसेल व्यापारी!",
        taglineEn: "Wholesale & Retail Grocery Store in Belwandi",
        phone: "919876543210",
        displayPhone: "+91 98765 43210",
        address: "मुख्य बाजारपेठ, बेलवंडी, ता. श्रीगोंदा, जि. अहिल्यानगर (अहमदनगर) - ४१३७०२",
        targetPincode: "413702",
        mapLink: "https://maps.google.com/?q=Belwandi+Kirana+Store",
        timings: "सकाळी ७:०० ते रात्री ९:३० (दररोज चालू)"
    },
    reviews: [
        {
            id: 1,
            name: "संकेत सांगळे (Sanket Sangle)",
            rating: 5,
            date: "१ महिन्यापूर्वी (Google Review)",
            badge: "होलसेल खरेदीदार (Wholesale Buyer)",
            text: "बेलवंडीमधील सर्वोत्तम होलसेल व किरकोळ किराणा दुकान! उत्तम दर्जाचे अन्नधान्य, योग्य दर आणि व्यापाऱ्यांसाठी खूप चांगली सवलत मिळते. नक्की भेट द्या!"
        },
        {
            id: 2,
            name: "निवास शिंदे (Niwas Shinde)",
            rating: 5,
            date: "३ आठवड्यांपूर्वी (Google Review)",
            badge: "नियमित ग्राहक (Regular Customer)",
            text: "फारच छान अनुभव. सर्व किराणा माल स्वच्छ आणि ताजा असतो. मालकांचे बोलणे अतिशय आदरयुक्त आहे आणि घरपोच डिलिव्हरी सुद्धा वेळेवर देतात. ५ स्टार!"
        },
        {
            id: 3,
            name: "गणेश पवार (Ganesh Pawar)",
            rating: 5,
            date: "२ महिन्यांपूर्वी",
            badge: "स्थानिक रहिवासी (Belwandi)",
            text: "लग्नकार्य आणि घरगुती कार्यक्रमांसाठी लागणारा मोठा किराणा आम्ही इथूनच घेतो. एकाच छताखाली सर्व वस्तू योग्य भावात मिळतात."
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
            name: "कोलम स्टीम राईस (Kolam Rice)",
            category: "grains",
            image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=60",
            retailUnit: "१ किलो",
            retailPrice: 65,
            wholesaleUnit: "२५ किलो पोते",
            wholesalePrice: 1450,
            badge: "होलसेल सवलत"
        },
        {
            id: "p2",
            name: "प्रीमियम बासमती तुकडा (Basmati)",
            category: "grains",
            image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=500&auto=format&fit=crop&q=60",
            retailUnit: "१ किलो",
            retailPrice: 80,
            wholesaleUnit: "३० किलो कट्टा",
            wholesalePrice: 2150,
            badge: "लोकप्रिय"
        },
        {
            id: "p3",
            name: "शुद्ध तूर डाळ (Latur Tur Dal)",
            category: "pulses",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60",
            retailUnit: "१ किलो",
            retailPrice: 155,
            wholesaleUnit: "३० किलो पोते",
            wholesalePrice: 4250,
            badge: "होलसेल उपलब्ध"
        },
        {
            id: "p4",
            name: "मूग डाळ (Moong Dal)",
            category: "pulses",
            image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=60",
            retailUnit: "१ किलो",
            retailPrice: 110,
            wholesaleUnit: "२५ किलो पोते",
            wholesalePrice: 2500,
            badge: ""
        },
        {
            id: "p5",
            name: "फॉर्च्युन शेंगदाणा तेल (Groundnut Oil)",
            category: "oil",
            image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=60",
            retailUnit: "१ लिटर पाऊच",
            retailPrice: 165,
            wholesaleUnit: "१५ लिटर डबा",
            wholesalePrice: 2280,
            badge: "होलसेल डबा दर"
        },
        {
            id: "p6",
            name: "गोवर्धन शुद्ध देशी गायीचे तूप (Pure Ghee)",
            category: "oil",
            image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=500&auto=format&fit=crop&q=60",
            retailUnit: "१ लिटर",
            retailPrice: 620,
            wholesaleUnit: "१५ लिटर कॅन",
            wholesalePrice: 8700,
            badge: "प्रीमियम"
        },
        {
            id: "p7",
            name: "उत्तम शुद्ध साखर (M30 Clean Sugar)",
            category: "spices",
            image: "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=500&auto=format&fit=crop&q=60",
            retailUnit: "१ किलो",
            retailPrice: 42,
            wholesaleUnit: "५० किलो पोते",
            wholesalePrice: 1950,
            badge: "होलसेल पोते"
        },
        {
            id: "p8",
            name: "काजू व बदाम कॉम्बो (Dryfruits Combo)",
            category: "dryfruits",
            image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=60",
            retailUnit: "५०० ग्रॅम",
            retailPrice: 440,
            wholesaleUnit: "१० किलो बॉक्स",
            wholesalePrice: 7800,
            badge: "सण विशेष"
        },
        {
            id: "p9",
            name: "वॉशिंग पावडर व साबण कॉम्बो",
            category: "daily",
            image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&auto=format&fit=crop&q=60",
            retailUnit: "१ किलो पॅक",
            retailPrice: 90,
            wholesaleUnit: "१ कार्टन (१२ नग)",
            wholesalePrice: 960,
            badge: ""
        }
    ]
};
