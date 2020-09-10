import React from "react";
import renderer from "react-test-renderer";
import {SearchBar} from "../searchBar";

test("test searchbar for correct search term", () => {
  const searchTerm = "search me";
  const rendered = renderer.create(
      <SearchBar search={searchTerm} searchAction={()=>{}} />
  );
  const renderJson = rendered.toJSON();
  // @ts-ignore
  expect(renderJson.children[1].props.value).toEqual(searchTerm);

});
test("test searchbar display snapshot", () => {

  const rendered = renderer.create(
      <SearchBar search={"search me"} searchAction={()=>{}} />
  );
  expect(rendered).toMatchSnapshot();
});
