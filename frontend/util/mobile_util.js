export default function isMobile() {
  const dv = document.getElementById('divscr');
  if (dv.offsetWidth - dv.clientWidth < 10) {
    // alert('It is mobile');
    return true;
  }
  // alert('It is not mobile');
  return false;
}
