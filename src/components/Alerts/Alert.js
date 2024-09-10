import Swal from "sweetalert2"

export const showSuccessAlert = (message, position, timer) => {
  Swal.fire({
    icon: "success",
    html: `
            <p>${message}</p>
            `,
    showConfirmButton: false,
    timer: timer, 
    timerProgressBar: true,
    position: position,
  })
}

export const showErrorAlert = (message, position, timer) => {
  Swal.fire({
    icon: "error",
   
    html: `
            <p>${message}</p>
            `,
    showConfirmButton: false,
    timer: timer, 
    timerProgressBar: true,
    position: position,
  })
}

export const showSuccessAlertOnReg = (message, position, timer) => {
  Swal.fire({
    icon: "success",
    html: `
            <p>${message}</p>
            `,
    showConfirmButton: false,
    timer: timer, 
    timerProgressBar: true,
    position: position,
  })
}
