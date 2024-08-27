import Swal from 'sweetalert2';


export const showSuccessAlert = (message, position, timer) => {
    Swal.fire({
        icon: 'success',
        title: 'Success!',
        html: `
            <p>${message}</p>
            `,
        showConfirmButton: false,
        timer: timer, // Closes after 2 seconds
        timerProgressBar: true,
        position: position,
    });
};

export const showErrorAlert = (message, position, timer) => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        html: `
            <p>${message}</p>
            `,
        showConfirmButton: false,
        timer: timer, // Closes after 2 seconds
        timerProgressBar: true,
        position: position,
    });
};

export const showSuccessAlertOnReg = (message, position, timer) => {
    Swal.fire({
        icon: 'success',
        html: `
            <p>${message}</p>
            `,
        showConfirmButton: false,
        timer: timer, // Closes after 2 seconds
        timerProgressBar: true,
        position: position,
    });
};