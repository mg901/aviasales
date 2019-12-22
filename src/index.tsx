import React from "react";
import { render } from "react-dom";
import { App } from "./app";

import "normalize.css";
import "./styles/main.css";

import { $tickets } from "./tickets-list";

$tickets.watch(console.log);

render(<App />, document.getElementById("root"));
