import React from "react";
import render from "riteway/render-component";
import { describe } from "riteway";

describe("renderComponent", async (assert) => {
  console.log("seennn");
  const $ = render(<div className="foo">testing</div>);

  assert({
    given: "some jsx",
    should: "render markup",
    actual: $(".foo").html().trim(),
    expected: "testing",
  });
});
