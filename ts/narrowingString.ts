type ContentType = "post" | "page" | "asset";
type ContentType2 = "post" | "page" | "asset" | (string & {});

function retrieve(
  contentType: "post" | "page" | "asset" | (string & {}),
): string[] {}

retrieve();
