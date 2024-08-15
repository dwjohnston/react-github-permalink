import { ErrorResponses } from "../config/GithubPermalinkContext";
import { exhaustiveFailure } from "../utils/exhaustiveFailure";

export function ErrorMessages(props: {
    data: ErrorResponses
}) {

    const data = props.data;    
    if(data.status === "404"){
        return <>
          <p className="error"> 
           Github returned an HTTP status 404. Is this a private Github repo? 
          </p>
        </>
      }
    
      if(data.status ==="rate-limit"){
        return <>
          <p className="error"> 
          You have encountered Github's unauthenticated API request rate limit. You can still visit the above link to see the code snippet.
          </p>
        </>
      }
    
      if(data.status ==="other-error"){
        return <>
          <p className="error"> 
              An unknown error occurred.
          </p>
        </>
      }

      return exhaustiveFailure(data);
}
