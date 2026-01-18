import { isAxiosError } from "axios";
import { toast } from "sonner";

interface ErrorData {
  message: string;
}

export function toastError(error: Error, fallback = "Something went wrong") {
  if (isAxiosError(error) && error.response) {
    const errData = error.response.data as ErrorData;
    toast.error(errData.message);
    return;
  }

  toast.error(fallback);
}
