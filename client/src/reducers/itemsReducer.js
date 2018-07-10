const initialState = {
  items: [
    {
      id: 1,
      description: "Sweet shoes produced by the G.O.A.T Kanye West.",
      image: 'https://www.yeezys.club/image/cache/catalog/TB2ErI.dohnpuFjSZFPXXb_4XXa_!!2914266524-400x400.jpg',
      name: 'Yeezys',
      price: 300,
      quantity: 0
    },
    {
      id: 2,
      description: 'This sweater will unlock super Github abilities. It will also make you look super fresh.',
      image: 'https://cdn.shopify.com/s/files/1/0262/3477/products/product-image-457055122.jpg?v=1510010749',
      name: 'Github Sweater',
      price: 20,
      quantity: 0
    },
    {
      id: 3,
      description: 'Ever wanted to look like a swole coder? Just put a scoop into your coffee for instant results.',
      image: 'https://cdn.hoppingo.com/products/163472/medium/inlife-whey-protein-powder-2-lbs--chocolate-flavour--body-building-supplement----------------------------------------------2lb-.jpg',
      name: 'Protein Powder',
      price: 50,
      quantity: 0
    },
    {
      id: 4,
      description: 'Almost as cool as the Yeezys, these boosts will boost your performance in the gym. No pun intended.',
      image: 'https://img.runningwarehouse.com/360/ADMUB/10.jpg',
      name: 'Adidas Boosts',
      price: 300,
      quantity: 0
    },
    {
      id: 5,
      description: 'One of the most powerful rackets in tennis. It will take your game to the next level.',
      image: 'https://cdn.sweatband.com/yonex_vcore_sv_100_g_tennis_racket_yonex_vcore_sv_100_g_tennis_racket-front_400x400.jpg',
      name: 'Tennis Racket',
      price: 200,
      quantity: 0
    },
    {
      id: 6,
      description: 'Filled with vitamin K, you\'ll be healthy for life.',
      image: 'https://www.comenaranjas.com/images/stories/virtuemart/product/banana.jpg',
      name: 'Banana',
      price: 1,
      quantity: 0
    },
    {
      id: 7,
      description: 'An apple a day keeps you coding away.',
      image: 'https://static1.squarespace.com/static/56fd6d45cf80a1aa296f85e5/t/5714e8b02eeb81400007511f/1460988087814/',
      name: 'Apple',
      price: 1,
      quantity: 0
    },
    {
      id: 8,
      description: 'Best laptop for coding. 4k screen so you\'ll want to be starring for those tiny errors you made.',
      image: 'https://www.jbhifi.com.au/FileLibrary/ProductResources/Images/241898-L-LO.jpg',
      name: 'Laptop',
      price: 3000,
      quantity: 0
    },
    {
      id: 9,
      description: 'A cool phone that doesn\'t even exist yet.',
      image: 'https://www.iphonetricks.org/wp-content/uploads/2017/11/locked-iphone-x.png',
      name: 'iPhone 11',
      price: 5000,
      quantity: 0
    },
    {
      id: 10,
      description: 'The only mouse you\'ll need. Equipped with a keyboard.',
      image: 'https://wh1k8zidop.inscname.net/big/914189.jpg?v=1466713296',
      name: 'Mouse',
      price: 100,
      quantity: 0
    }
  ]
}

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}