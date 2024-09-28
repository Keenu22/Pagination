import axios from "axios";

export default async function Api() {
  try {
    const response = await axios.get(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    return response.data;
  } catch (error) {
    throw error; // Throw the error to be caught in the calling component
  }
}
