const colors = [
    '#FC8181',
    '#F6AD55',
    '#F6E05E',
    '#68D391',
    '#4FD1C5',
    '#63B3ED',
    '#7F9CF5',
    '#B794F4',
    '#F687B3',
    '#eae0d0',
    '#282828',
];

const nicNames = [
    'Trendway',
    'Ska4ek',
    'Magick',
    'Lucky',
    'Rainbow',
    'Pegasus',
    'Sunlight',
    'Juicy',
    'MilkyWay',
    'Terminator',
    'MinnieMouse',
    'Firebird',
];

const firstNames = [
    'Alex',
    'Aaron',
    'Ben',
    'Carl',
    'Dan',
    'David',
    'Edward',
    'Fred',
    'Frank',
    'George',
    'Hal',
    'Hank',
    'Ike',
    'John',
    'Jack',
    'Joe',
    'Larry',
    'Monte',
    'Matthew',
    'Mark',
    'Nathan',
];

const lastNames = [
    'Anderson',
    'Ashwoon',
    'Aikin',
    'Bateman',
    'Bongard',
    'Bowers',
    'Boyd',
    'Cannon',
    'Cast',
    'Deitz',
    'Dewalt',
    'Ebner',
    'Frick',
    'Hancock',
    'Haworth',
    'Hesch',
    'Hoffman',
    'Kassing',
    'Knutson',
];

const hashTags = [
    '#love',
    '#instagood',
    '#fashion',
    '#photooftheday',
    '#beautiful',
    '#art',
    '#photography',
    '#happy',
    '#picoftheday',
    '#cute',
    '#follow',
    '#tbt',
    '#followme',
    '#nature',
    '#like4like',
    '#travel',
    '#instagram',
    '#style',
    '#repost',
    '#summer',
    '#instadaily',
    '#selfie',
    '#me',
    '#friends',
    '#fitness',
    '#girl',
    '#food',
    '#fun',
    '#beauty',
]

const messages = [
    'Glam Friday Night',
    'Party Ready!',
    'You are a symbol of beauty',
    'You mean the world to me',
    'You are the definition of “Beauty”',
    'You are graceful',
    'You look mesmerizing',
    'You are so much lovely',
    'Just ‘WOW’ for your natural beauty',
    'Your sense of fashion is great',
    'It’s refreshing, your beauty',
    'I see the power of your grace',
];

const clothing = [
    'Sweater',
    'Dress',
    'Hoodies',
    'T-shirt',
    'Flip-flops',
    'Shorts',
    'Skirt',
    'Jeans',
    'Shoes',
    'Coat',
    'High heels',
    'Suit',
    'Cap',
    'Socks',
    'Shirt',
    'Bra',
    'Scarf',
    'Swimsuit',
    'Hat',
    'Gloves',
    'Jacket',
    'Long coat',
    'Boots',
    'Sunglasses',
    'Tie',
    'Polo shirt',
    'Leather jackets'
]

const brands = [
    'LOUIS VUITTON',
    'GUCCI',
    'HERMES',
    'PRADA',
    'CHANEL',
    'RALPH LAUREN',
    'BURBERRY',
    'VERSACE',
    'FENDI',
    'ARMANI',
    'Dolce & Gabbana',
    'Valentino',
    'Off-White',
    'Givenchy',
    'Balenciaga',
    'Yves Saint Laurent',
    'Dior',
]

const shops = [
    'boohoo.com',
    'nastygal.com',
    'hm.com',
    'freepeople.com',
    'asos.com',
    'mango.com',
    'luisaviaroma.com',
    'theoutnet.com',
    'shopbop.com',
    'revolveclothing.com',
    'topshop.com'
];

const itemsNames = [
    'Lace Floral Evening Dress',
    'Pretty Little Thing',
    'Red Blazer Dress',
    'Nudie Dress',
    'Front Zip Dress',
    'Bardot Dress',
    'Green Dress',
    'Yellow Jumper',
    'Crossbody bag',
    'Star Denim',
    'Denim Skirt',
    'Stripe Jumper',
    'Navy Oxford Shirt',
    'Palm Beach Tee',
    'Red & Pink Stripped Tee',
    'Pink Flag Tee',
    'Navy Signature Logo',
    'Blue Icon Tee',
    'Navy Icon Tee',
    'Green Silk Dress',
    'Mustard One Shoulder',
    'Lace Blue Dress',
]

export const getProdImage = () => 'https://fakeimg.pl/230x440/'+colors[Math.floor(Math.random() * colors.length)].replace("#", "")+'/'+colors[Math.floor(Math.random() * colors.length)].replace("#", "")+'/?text='+clothing[Math.floor(Math.random() * clothing.length)];
export const getUserImage = iName => 'https://fakeimg.pl/87x87/'+colors[Math.floor(Math.random() * (colors.length-1))].replace("#", "")+'/'+colors[colors.length-1].replace("#", "")+'/?font_size=80&text='+iName.charAt(0);
export const getBrandImage = iName => 'https://fakeimg.pl/100x100/'+colors[Math.floor(Math.random() * (colors.length-1))].replace("#", "")+'/'+colors[colors.length-1].replace("#", "")+'/?font_size=30&text='+iName;
export const getID = () => Math.floor(Math.random() * 100000).toString();

export const generateItems = (count = 5) =>
    Array(count)
        .fill()
        .map((_, index) => ({
            brand: brands[Math.floor(Math.random() * brands.length)],
            shop: shops[Math.floor(Math.random() * shops.length)],
            image: getProdImage(),
            price: '£'+ Math.floor(Math.random() * 500).toString(),
            name: itemsNames[Math.floor(Math.random() * itemsNames.length)],
            description: 'Lorem ipsum dolor sit amen, consectetuer aqipiscing elit, sed do eiusmod tempor incididunt ut ero labore et dolore magna aliqua.',

        }));

export const generateLookItems = (count = 50) =>
    Array(count)
        .fill()
        .map((_, index) => ({
            id: index,
            user: {
                uid: getID(),
                nicName: nicNames[Math.floor(Math.random() * nicNames.length)],
                avatar: getUserImage(),
            },
            items: generateItems(1+Math.floor(Math.random() * 6)),
            views: Math.floor(Math.random() * 1000),
            name: 'Party Ready!',
            description: '#party #dressy #ootd #dress #glam',
        }));

export const generateUser = () => {
    return {
        nicName: nicNames[Math.floor(Math.random() * nicNames.length)],
        avatar: getUserImage(),
        outfits: Math.floor(Math.random() * 100),
        followers: Math.floor(Math.random() * 200),
        following: Math.floor(Math.random() * 200),
        fullName:firstNames[Math.floor(Math.random() * firstNames.length)] + ' ' +
            lastNames[Math.floor(Math.random() * lastNames.length)],
        age: '22',
        city: 'London',
        slogan: 'Wishing it was always summer xx',
    }
}
