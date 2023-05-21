export const toastMessage = (
  toast: any,
  message: string = 'Success',
  isError: boolean = false
) => {
  return toast({
    position: 'top',
    description: message,
    status: isError === true ? 'error' : 'success',
    duration: 3000,
    isClosable: true,
  });
};
