// const sounds = [
//   process.env.PUBLIC_URL + '/sounds/sound1.mp3',
//   process.env.PUBLIC_URL + '/sounds/sound2.mp3',
//   process.env.PUBLIC_URL + '/sounds/sound3.mp3',
// ];

const sounds = [];
for (let i = 1; i < 13; i++) {
  sounds.push(process.env.PUBLIC_URL + '/sounds/sound' + i + '.mp3');
}

export default sounds;

