// old UAT
// const S3_BUCKET_URL =
//   'https://s3.eu-west-2.amazonaws.com/ins-main-stg-unify/public-appdata/Themes/SDG/ActionImages';
// UAT
// const S3_BUCKET_URL =
//   'https://s3.eu-west-2.amazonaws.com/inse-main-stg-unify/public-appdata/Themes/SDG/ActionImages';
// test
// const S3_BUCKET_URL =
//   'https://iptestprcore164.s3.eu-west-1.amazonaws.com/public-appdata/Themes/SDG/ActionImages'

//old production
// const S3_BUCKET_URL =
//   'https://s3.eu-west-2.amazonaws.com/unify.live/public-appdata/Themes/SDG/ActionImages';
// production
const S3_BUCKET_URL =
  'https://s3.eu-west-2.amazonaws.com/ins-main-prd-unify/public-appdata/Themes/SDG/ActionImages';

export const getImage = (name) => {
  const images = {
    'streamline-icon-3d-print-ball@140x140.png': require('../../assets/action-icons/streamline-icon-3d-print-ball@140x140.png'),
    'streamline-icon-3d-print-tshirt@140x140.png': require('../../assets/action-icons/streamline-icon-3d-print-tshirt@140x140.png'),
    'streamline-icon-baby-care-diaper@140x140.png': require('../../assets/action-icons/streamline-icon-baby-care-diaper@140x140.png'),
    'streamline-icon-bathroom-shower-1@140x140.png': require('../../assets/action-icons/streamline-icon-bathroom-shower-1@140x140.png'),
    'streamline-icon-bathroom-tub-person@140x140.png': require('../../assets/action-icons/streamline-icon-bathroom-tub-person@140x140.png'),
    'streamline-icon-beard-style-shaving-machine@140x140.png': require('../../assets/action-icons/streamline-icon-beard-style-shaving-machine@140x140.png'),
    'streamline-icon-beer-glass-foam@140x140.png': require('../../assets/action-icons/streamline-icon-beer-glass-foam@140x140.png'),
    'streamline-icon-bicycle-sports-1@140x140.png': require('../../assets/action-icons/streamline-icon-bicycle-sports-1@140x140.png'),
    'streamline-icon-bread-loaf@140x140.png': require('../../assets/action-icons/streamline-icon-bread-loaf@140x140.png'),
    'streamline-icon-breakfast-cereal-bowl-spoon@140x140.png': require('../../assets/action-icons/streamline-icon-breakfast-cereal-bowl-spoon@140x140.png'),
    'streamline-icon-car-repair-wash-1@140x140.png': require('../../assets/action-icons/streamline-icon-car-repair-wash-1@140x140.png'),
    'streamline-icon-charging-cable@140x140.png': require('../../assets/action-icons/streamline-icon-charging-cable@140x140.png'),
    'streamline-icon-coffee-to-go@140x140.png': require('../../assets/action-icons/streamline-icon-coffee-to-go@140x140.png'),
    'streamline-icon-decoration-flowers@140x140.png': require('../../assets/action-icons/streamline-icon-decoration-flowers@140x140.png'),
    'streamline-icon-dentistry-tooth-brush@140x140.png': require('../../assets/action-icons/streamline-icon-dentistry-tooth-brush@140x140.png'),
    'streamline-icon-disability-heart-plus@140x140.png': require('../../assets/action-icons/streamline-icon-disability-heart-plus@140x140.png'),
    'streamline-icon-ecology-globe-house@140x140.png': require('../../assets/action-icons/streamline-icon-ecology-globe-house@140x140.png'),
    'streamline-icon-ecology-leaf-book@140x140.png': require('../../assets/action-icons/streamline-icon-ecology-leaf-book@140x140.png'),
    'streamline-icon-ecology-leaf-bulb@140x140.png': require('../../assets/action-icons/streamline-icon-ecology-leaf-bulb@140x140.png'),
    'streamline-icon-envelope-letter@140x140.png': require('../../assets/action-icons/streamline-icon-envelope-letter@140x140.png'),
    'streamline-icon-equalizer-stereo-1@140x140.png': require('../../assets/action-icons/streamline-icon-equalizer-stereo-1@140x140.png'),
    "streamline-icon-farmer's-market-kiosk-1@140x140.png": require("../../assets/action-icons/streamline-icon-farmer's-market-kiosk-1@140x140.png"),
    'streamline-icon-fast-food-burger@140x140.png': require('../../assets/action-icons/streamline-icon-fast-food-burger@140x140.png'),
    'streamline-icon-fast-food-pizza-slice@140x140.png': require('../../assets/action-icons/streamline-icon-fast-food-pizza-slice@140x140.png'),
    'streamline-icon-fitness-heart-rate@140x140.png': require('../../assets/action-icons/streamline-icon-fitness-heart-rate@140x140.png'),
    'streamline-icon-fruit-acorn@140x140.png': require('../../assets/action-icons/streamline-icon-fruit-acorn@140x140.png'),
    'streamline-icon-fruit-apple@140x140.png': require('../../assets/action-icons/streamline-icon-fruit-apple@140x140.png'),
    'streamline-icon-global-warming-high-temperature@140x140.png': require('../../assets/action-icons/streamline-icon-global-warming-high-temperature@140x140.png'),
    'streamline-icon-human-resources-search-team@140x140.png': require('../../assets/action-icons/streamline-icon-human-resources-search-team@140x140.png'),
    'streamline-icon-ice-cream-bite@140x140.png': require('../../assets/action-icons/streamline-icon-ice-cream-bite@140x140.png'),
    'streamline-icon-laptop-1@140x140.png': require('../../assets/action-icons/streamline-icon-laptop-1@140x140.png'),
    'streamline-icon-laptop-flash@140x140.png': require('../../assets/action-icons/streamline-icon-laptop-flash@140x140.png'),
    'streamline-icon-locker-room-hanger@140x140.png': require('../../assets/action-icons/streamline-icon-locker-room-hanger@140x140.png'),
    'streamline-icon-meeting-laptop@140x140.png': require('../../assets/action-icons/streamline-icon-meeting-laptop@140x140.png'),
    'streamline-icon-meeting-team-laptop-1@140x140.png': require('../../assets/action-icons/streamline-icon-meeting-team-laptop-1@140x140.png'),
    'streamline-icon-milk-carton@140x140.png': require('../../assets/action-icons/streamline-icon-milk-carton@140x140.png'),
    'streamline-icon-monitor-disable@140x140.png': require('../../assets/action-icons/streamline-icon-monitor-disable@140x140.png'),
    'streamline-icon-network-share@140x140.png': require('../../assets/action-icons/streamline-icon-network-share@140x140.png'),
    'streamline-icon-newspaper-fold@140x140.png': require('../../assets/action-icons/streamline-icon-newspaper-fold@140x140.png'),
    'streamline-icon-organic-rain-growth@140x140.png': require('../../assets/action-icons/streamline-icon-organic-rain-growth@140x140.png'),
    'streamline-icon-phone-action-email-1@140x140.png': require('../../assets/action-icons/streamline-icon-phone-action-email-1@140x140.png'),
    'streamline-icon-plane-1@140x140.png': require('../../assets/action-icons/streamline-icon-plane-1@140x140.png'),
    'streamline-icon-print-text@140x140.png': require('../../assets/action-icons/streamline-icon-print-text@140x140.png'),
    'streamline-icon-real-estate-search-house@140x140.png': require('../../assets/action-icons/streamline-icon-real-estate-search-house@140x140.png'),
    'streamline-icon-recycling-bag-1@140x140.png': require('../../assets/action-icons/streamline-icon-recycling-bag-1@140x140.png'),
    'streamline-icon-safety-helmet-1@140x140.png': require('../../assets/action-icons/streamline-icon-safety-helmet-1@140x140.png'),
    'streamline-icon-scanner@140x140.png': require('../../assets/action-icons/streamline-icon-scanner@140x140.png'),
    'streamline-icon-stairs-person-ascend-1@140x140.png': require('../../assets/action-icons/streamline-icon-stairs-person-ascend-1@140x140.png'),
    'streamline-icon-stove-induction-pot@140x140.png': require('../../assets/action-icons/streamline-icon-stove-induction-pot@140x140.png'),
    'streamline-icon-study-brain@140x140.png': require('../../assets/action-icons/streamline-icon-study-brain@140x140.png'),
    'streamline-icon-style-three-pin-basket@140x140.png': require('../../assets/action-icons/streamline-icon-style-three-pin-basket@140x140.png'),
    'streamline-icon-style-three-pin-fish-prepare@140x140.png': require('../../assets/action-icons/streamline-icon-style-three-pin-fish-prepare@140x140.png'),
    'streamline-icon-style-two-pin-train@140x140.png': require('../../assets/action-icons/streamline-icon-style-two-pin-train@140x140.png'),
    'streamline-icon-switch-off@140x140.png': require('../../assets/action-icons/streamline-icon-switch-off@140x140.png'),
    'streamline-icon-tea-kettle-1@140x140.png': require('../../assets/action-icons/streamline-icon-tea-kettle-1@140x140.png'),
    'streamline-icon-team-idea@140x140.png': require('../../assets/action-icons/streamline-icon-team-idea@140x140.png'),
    'streamline-icon-team-meeting-chat@140x140.png': require('../../assets/action-icons/streamline-icon-team-meeting-chat@140x140.png'),
    'streamline-icon-team-meeting@140x140.png': require('../../assets/action-icons/streamline-icon-team-meeting@140x140.png'),
    'streamline-icon-toilet-paper@140x140.png': require('../../assets/action-icons/streamline-icon-toilet-paper@140x140.png'),
    'streamline-icon-toilet-sign-2@140x140.png': require('../../assets/action-icons/streamline-icon-toilet-sign-2@140x140.png'),
    'streamline-icon-vegetables-carrot@140x140.png': require('../../assets/action-icons/streamline-icon-vegetables-carrot@140x140.png'),
    'streamline-icon-vegetables-mushroom-soup@140x140.png': require('../../assets/action-icons/streamline-icon-vegetables-mushroom-soup@140x140.png'),
    'streamline-icon-video-player-laptop@140x140.png': require('../../assets/action-icons/streamline-icon-video-player-laptop@140x140.png'),
    'streamline-icon-walking@140x140.png': require('../../assets/action-icons/streamline-icon-walking@140x140.png'),
    'streamline-icon-water-bottle-glass@140x140.png': require('../../assets/action-icons/streamline-icon-water-bottle-glass@140x140.png'),
    'streamline-icon-water-container@140x140.png': require('../../assets/action-icons/streamline-icon-water-container@140x140.png'),
    'streamline-icon-wine-glass-bottle@140x140.png': require('../../assets/action-icons/streamline-icon-wine-glass-bottle@140x140.png'),
  };
  if (images[name]) {
    return images[name];
  }
  return {
    uri: `${S3_BUCKET_URL}/${encodeURI(name)}`,
  };
};
