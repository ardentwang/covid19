import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

//function InfoBox are the 3 cards displayed on the GUI
function InfoBox({ title, cases, total, active, isRed, ...props }) {
  //debugging code that allows the user to see what the program is retriving through console
  console.log(title, active);
  return (

    //Card is an imported component from material-ui/core
    <Card

      //changes the appearance of className and CardContent once there is a user "onClick"
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      }`}
    >

      //formats the Card to display color and change text formatting
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
          {cases}
        </h2>

        
        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;