const toolData = new Map([
  ['draw', {
    'mode': 'draw',
    'image': 'icon_draw.svg',
    'tools': new Map([
      ['brush-S', {
        'tool': 'brush-S',
        'image': 'icon_brush-S.svg',
        'size': 1
      }],
      ['brush-M', {
        'tool': 'brush-M',
        'image': 'icon_brush-M.svg',
        'size': 2
      }],
      ['brush-L', {
        'tool': 'brush-L',
        'image': 'icon_brush-L.svg',
        'size': 3
      }]
    ]),
    'colors': new Map([
      ['colorG1', {
        'colorName': 'colorG1',
        'image': 'icon_colorG1.jpg',
        'color': ['#3c783b', '#437c42', '#3d783c', '#417a40', '#458042']
      }],
      ['colorG2', {
        'colorName': 'colorG2',
        'image': 'icon_colorG2.jpg',
        'color': ['#42a140', '#49a646', '#40a03e', '#44a63f', '#4fa544']
      }],
      ['colorG3', {
        'colorName': 'colorG3',
        'image': 'icon_colorG3.jpg',
        'color': ['#5dc549', '#5fc647', '#5bc746', '#6ecd51', '#5cc746']
      }],
      ['colorSand', {
        'colorName': 'colorSand',
        'image': 'icon_colorSand.jpg',
        'color': ['#f0e8a7', '#ece5a2', '#ede7a6', '#ebe6a1', '#eee8b4']
      }],
      ['colorWater', {
        'colorName': 'colorWater',
        'image': 'icon_colorWater.jpg',
        'color': ['#78d4c3', '#7bd8c3', '#7dd9c0', '#79d6c1', '#76d5c3']
      }], 
      ['colorRock', {
        'colorName': 'colorRock',
        'image': 'icon_colorRock.jpg',
        'color': ['#6e7484', '#818793', '#6e7689', '#6f7684', '#747788']
      }],
      ['colorCustom', {
        'colorName': 'colorCustom',
        'image': 'icon_palette.svg',
        'color': ['#b0a07c']
      }]
    ])
  }],
  ['build', {
    'mode': 'build',
    'image': 'icon_build.svg',
    'tools': new Map([
      ['building', {
        'tool': 'building',
        'image': 'icon_building.svg',
        'color': '#544f40',
        'items': new Map([
          ['home', {
            'item': 'home',
            'image': 'icon_home.svg',
            'size': [5, 4],
            'color': '#f784ae'
          }],
          ['house', {
            'item': 'house',
            'image': 'icon_house.svg',
            'size': [4, 4],
            'color': '#f8b616'
          }],
          ['store', {
            'item': 'store',
            'image': 'icon_store.svg',
            'size': [7, 4]
          }],
          ['apparel', {
            'item': 'apparel',
            'image': 'icon_apparel.svg',
            'size': [5, 4]
          }],
          ['museum', {
            'item': 'museum',
            'image': 'icon_museum.svg',
            'size': [7, 4]
          }],
          ['infoCenter', {
            'item': 'infoCenter',
            'image': 'icon_infoCenter.svg',
            'size': [12, 10]
          }],
          ['camp', {
            'item': 'camp',
            'image': 'icon_camp.svg',
            'size': [4, 4]
          }],
          ['airPort', {
            'item': 'airPort',
            'image': 'icon_airport.svg',
            'size': [8, 8]
          }]
        ])
      }],
      ['bridge', {
        'tool': 'bridge',
        'image': 'icon_bridge.svg',
        'color': '#847f64',
        'items': new Map([
          ['b0', {
            'item': 'b0',
            'image': 'icon_b0.svg',
            'size': [4, 2]
          }],
          ['b90', {
            'item': 'b90',
            'image': 'icon_b90.svg',
            'size': [2, 4]
          }],
          ['b45', {
            'item': 'b45',
            'image': 'icon_b45.svg',
            'size': [6, 6]
          }],
          ['b135', {
            'item': 'b135',
            'image': 'icon_b135.svg',
            'size': [6, 6]
          }]
        ])
      }],
      ['slope', {
        'tool': 'slope',
        'image': 'icon_slope.svg',
        'color': '#edda96',
        'items': new Map([
          ['s0', {
            'item': 's0',
            'image': 'icon_s0.svg',
            'size': [4, 2]
          }],
          ['s90', {
            'item': 's90',
            'image': 'icon_s90.svg',
            'size': [2, 4]
          }]
        ])
      }]
    ])
  }],
  ['plant', {
    'mode': 'plant',
    'image': 'icon_plant.svg',
    'tools': new Map([
      ['tree', {
        'tool': 'tree',
        'image': 'icon_tree.svg',
        'color': '#00b27a',
        'size': [3, 3],
        'items': new Map([
          ['broadleaf', {
            'item': 'broadleaf'
          }],
          ['conifer', {
            'item': 'conifer',
            'color': '#12560c'
          }],
          ['apple', {
            'item': 'apple',
            'image': 'icon_apple.svg'
          }],
          ['cherry', {
            'item': 'cherry',
            'image': 'icon_cherry.svg' 
          }],
          ['coconut', {
            'item': 'coconut',
            'image': 'icon_coconut.svg'
          }],
          ['orange', {
            'item': 'orange',
            'image': 'icon_orange.svg'
          }],
          ['pear', {
            'item': 'pear',
            'image': 'icon_pear.svg'
          }],
          ['peach', {
            'item': 'peach',
            'image': 'icon_peach.svg'
          }],
          ['bamboo', {
            'item': 'bamboo',
            'image': 'icon_bamboo.svg',
            'color': '#c7ea7b'
          }]
        ])
      }],
      ['flower', {
        'tool': 'flower',
        'image': 'icon_flower.svg',
        'color': '#fff',
        'size': [1, 1],
        'items': new Map([
          ['red', {
            'item': 'red'
          }],
          ['yellow', {
            'item': 'yellow'
          }],
          ['white', {
            'item': 'white'
          }],
          ['orange', {
            'item': 'orange'
          }],
          ['pink', {
            'item': 'pink'
          }],
          ['purple', {
            'item': 'purple'
          }],
          ['black', {
            'item': 'black'
          }],
          ['blue', {
            'item': 'blue'
          }],
        ])
      }]
    ])
  }]
]);

export { toolData };