import React, { useState } from "react";
import classes from "./Home.module.css";

import { Nav } from "react-bootstrap";
import Notes from "../Notes/Notes";
import autumn from "../../Assets/autumn.png";
import spring from "../../Assets/spring.png";
import night from "../../Assets/moon.png";

function Home() {
  const [theme, setTheme] = useState("autumn");

  function changeTheme(t) {
    if (t == "spring") {
      document.body.style.setProperty("--orange", "#fab5b5");
      document.body.style.setProperty("--red", "#fac098");
      document.body.style.setProperty("--green", "#8CC0DE");
      document.body.style.setProperty("--peach", "#c6f1d6");
      setTheme("spring");
    } else if (t == "autumn") {
      document.body.style.setProperty("--orange", "#ecb390");
      document.body.style.setProperty("--red", "#df7861");
      document.body.style.setProperty("--green", "#94b49f");
      document.body.style.setProperty("--peach", "#fcf8e8");
      setTheme("autumn");
    }
  }

  return (
    <div className={classes.wrap}>
      <Nav className={`justify-content-end p-1 ${classes.nav}`}>
        {theme != "autumn" && (
          <button
            onClick={() => changeTheme("autumn")}
            className={classes.theme + " ml-2 mr-2 " + classes.autumn}
          >
            <img src={autumn} className={classes.logo} />
            Autumn
          </button>
        )}
        {theme != "spring" && (
          <button
            onClick={() => changeTheme("spring")}
            className={classes.theme + " ml-2 mr-2 " + classes.spring}
          >
            <img src={spring} className={classes.logo} />
            Spring
          </button>
        )}
      </Nav>
      <Notes />
    </div>
  );
}

export default Home;
