export const dateConverter = (waktu) => {
    const date = new Date(waktu);

    // Ambil komponen tanggal
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    // Format menjadi yyyy mm dd HH ii ss
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate

}