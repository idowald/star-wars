import {Query} from "../../types/query";
import {fetchSingleResource} from "../resources";


it("Test fetchSingleResource logic", () => {
  const query: Query = {resourceName: "films", id: "http://swapi.dev/api/films/6/"};
  const timestamp = "fetchSingleResource";
  const gen = fetchSingleResource({error: false, meta: undefined, payload: {timestamp, ...query}, type: ""});
  // @ts-ignore
  expect(gen.next().value.type).toEqual("CALL");
  // @ts-ignore
  expect(gen.next().value.type).toEqual("CALL");
  // @ts-ignore
  expect(gen.next().value.type).toEqual("ALL");


});
