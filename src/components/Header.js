function goToMain() {
  window.location.href = '/main';
}

function Header() {
  return (
    <div className="header" onClick={goToMain}>
      <h1 className="title">Yelp for Armenia</h1>
    </div>
  );
}

export default Header;
