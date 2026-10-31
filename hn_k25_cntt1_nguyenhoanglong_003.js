//Khoi tao mang
let students = [
    {
        studentCode: "STU-001",
        fullName: "Đặng Gia Huy",
        courseName: "Tiếng Anh Giao Tiếp",
        age: 19,
        placementScore: 65
    },
    {
        studentCode: "STU-002",
        fullName: "Phan Ngọc Lan",
        courseName: "Tiếng Anh Học Thuật",
        age: 24,
        placementScore: 72
    },
    {
        studentCode: "STU-003",
        fullName: "Trương Bảo Ngọc",
        courseName: "Tiếng Anh Thiếu Nhi",
        age: 9,
        placementScore: 40
    }

];

function validateStudentCode(code) {
    if (code === "") {
        return "Mã học viên không được để trống";
    }

    if (code.length < 6) {
        return "Mã học viên phải có ít nhất 6 ký tự";
    }

    if (!code.startsWith("STU-")) {
        return 'Mã học viên phải bắt đầu bằng "STU-"';
    }

    if (code.includes(" ")) {
        return "Mã học viên không được chứa khoảng trắng";
    }

    if (findStudentIndex(code) !== -1) {
        return "Mã học viên đã tồn tại";
    }

    return "";
}

// Tim vi tri hoc vien
function findStudentIndex(code) {
    return students.findIndex(function (student) {
        return student.studentCode === code;
    });
}

// Chuan hoa chuoi
function normalizeText(rawText) {
    return rawText
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase()
        .replace(/(^|\s)\S/g, function (letter) {
            return letter.toUpperCase();
        });
}

// Nhap so nguyen trong khoang cho phep
function inputIntegerInRange(message, min, max) {
    while (true) {
        const rawValue = prompt(message);

        if (rawValue === null) {
            return null;
        }

        const value = rawValue.trim();

        if (value === "") {
            console.log("Lỗi: chưa nhập, vui lòng nhập lại");
            continue;
        }

        const number = Number(value);

        if (!Number.isInteger(number)) {
            console.log("Lỗi: không phải số nguyên, vui lòng nhập lại");
            continue;
        }

        if (number < min || number > max) {
            console.log(`Lỗi: ngoài phạm vi ${min} - ${max}, vui lòng nhập lại`);
            continue;
        }

        return number;
    }
}

// Hien thi danh sach hoc vien
function displayStudents(list) {
    if (list.length === 0) {
        console.log("Danh sách học viên trống");
        return;
    }

    list.forEach(function (student, index) {
        console.log(
            `${index + 1}. ${student.studentCode} - ${student.fullName} - ${student.courseName}`
        );

        console.log(`Tuổi: ${student.age} | Điểm đầu vào: ${student.placementScore}`);
    });

    console.log(`Tổng: ${list.length} học viên`);
}

// Hien thi menu
function showMenu() {
    console.log("==============================================");
    console.log(" HỆ THỐNG QUẢN LÝ HỌC VIÊN TRUNG TÂM GLOBAL ENGLISH");
    console.log("==============================================");
    console.log("1. Hiển thị danh sách học viên");
    console.log("2. Thêm học viên mới");
    console.log("3. Cập nhật thông tin học viên");
    console.log("4. Xóa học viên");
    console.log("5. Tìm kiếm học viên theo khóa học");
    console.log("0. Thoát chương trình");
    console.log("==============================================");
}

// Hien thi danh sach
function showStudents() {
    displayStudents(students);
}

// Them hoc vien moi
function addStudent() {
    const rawCode = prompt("Nhập mã học viên:");

    if (rawCode === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }

    const studentCode = rawCode.trim().toUpperCase();
    const codeError = validateStudentCode(studentCode);

    if (codeError !== "") {
        console.log("Lỗi: " + codeError);
        return;
    }

    let fullName = "";

    while (fullName === "") {
        const rawName = prompt("Nhập họ tên học viên:");

        if (rawName === null) {
            console.log("Đã hủy thao tác thêm");
            return;
        }

        fullName = normalizeText(rawName);

        if (fullName === "") {
            console.log("Họ tên không được để trống, vui lòng nhập lại");
        }
    }

    let courseName = "";

    while (courseName === "") {
        const rawCourse = prompt("Nhập tên khóa học:");

        if (rawCourse === null) {
            console.log("Đã hủy thao tác thêm");
            return;
        }

        courseName = normalizeText(rawCourse);

        if (courseName === "") {
            console.log("Tên khóa học không được để trống, vui lòng nhập lại");
        }
    }

    const age = inputIntegerInRange("Nhập tuổi (6 - 60):", 6, 60);

    if (age === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }

    const placementScore = inputIntegerInRange(
        "Nhập điểm đầu vào (0 - 100):",
        0,
        100
    );

    if (placementScore === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }

    const newStudent = {
        studentCode: studentCode,
        fullName: fullName,
        courseName: courseName,
        age: age,
        placementScore: placementScore
    };

    students.push(newStudent);

    console.log("Thêm học viên thành công:");
    displayStudents([newStudent]);
}

// Cap nhat thong tin hoc vien
function updateStudent() {
    const rawCode = prompt("Nhập mã học viên cần cập nhật:");

    if (rawCode === null) {
        console.log("Đã hủy cập nhật");
        return;
    }

    const studentCode = rawCode.trim().toUpperCase();
    const studentIndex = findStudentIndex(studentCode);

    if (studentIndex === -1) {
        console.log(`Không tìm thấy học viên có mã ${studentCode}`);
        return;
    }

    const student = students[studentIndex];

    const oldAge = student.age;
    const oldScore = student.placementScore;

    console.log(`Thông tin trước khi cập nhật: tuổi ${oldAge}, điểm ${oldScore}`);

    const newAge = inputIntegerInRange("Nhập tuổi mới (6 - 60):", 6, 60);

    if (newAge === null) {
        console.log("Đã hủy cập nhật, thông tin giữ nguyên");
        return;
    }

    const newScore = inputIntegerInRange(
        "Nhập điểm đầu vào mới (0 - 100):",
        0,
        100
    );

    if (newScore === null) {
        console.log("Đã hủy cập nhật, thông tin giữ nguyên");
        return;
    }

    student.age = newAge;
    student.placementScore = newScore;

    console.log(`Cập nhật thành công: tuổi ${oldAge} -> ${student.age}`);
    console.log(`Điểm đầu vào: ${oldScore} -> ${student.placementScore}`);
}

// Xoa hoc vien
function deleteStudent() {
    const rawCode = prompt("Nhập mã học viên cần xóa:");

    if (rawCode === null) {
        console.log("Đã hủy thao tác xóa");
        return;
    }

    const studentCode = rawCode.trim().toUpperCase();
    const studentIndex = findStudentIndex(studentCode);

    if (studentIndex === -1) {
        console.log(`Không tìm thấy học viên có mã ${studentCode}`);
        return;
    }

    const answer = prompt("Bạn có chắc chắn muốn xóa học viên này không? (Y/N)");

    if (answer === null) {
        console.log("Đã hủy thao tác xóa");
        return;
    }

    const confirmAnswer = answer.trim().toUpperCase();

    if (confirmAnswer === "Y") {
        students.splice(studentIndex, 1);

        console.log("Xóa học viên thành công");
        console.log(`Số học viên còn lại: ${students.length}`);
    } else if (confirmAnswer === "N") {
        console.log("Đã hủy thao tác xóa");
    } else {
        console.log("Lựa chọn không hợp lệ, đã hủy thao tác xóa");
    }
}

function searchStudentByCourse() {
    const rawKeyword = prompt("Nhập từ khóa khóa học cần tìm:");

    if (rawKeyword === null || rawKeyword.trim() === "") {
        console.log("Chưa nhập từ khóa tìm kiếm");
        return;
    }

    const keyword = rawKeyword.trim().toLowerCase();

    const result = students.filter(function (student) {
        return student.courseName.toLowerCase().includes(keyword);
    });

    if (result.length === 0) {
        console.log("Không tìm thấy học viên phù hợp");
    } else {
        console.log(`Tìm thấy ${result.length} học viên:`);
        displayStudents(result);
    }
}


function runProgram() {
    let isRunning = true;

    while (isRunning) {
        showMenu();

        const rawChoice = prompt("Vui lòng nhập lựa chọn của bạn (0 - 5):");

        if (rawChoice === null) {
            console.log("Bạn đã hủy nhập. Vui lòng chọn 0 để thoát chương trình.");
            continue;
        }

        const choiceText = rawChoice.trim();

        if (choiceText === "" || !/^[0-5]$/.test(choiceText)) {
            console.log("Lựa chọn không hợp lệ. Vui lòng nhập số từ 0 đến 5.");
            continue;
        }

        const choice = Number(choiceText);

        switch (choice) {
            case 1: {
                showStudents();
                break;
            }

            case 2: {
                addStudent();
                break;
            }

            case 3: {
                updateStudent();
                break;
            }

            case 4: {
                deleteStudent();
                break;
            }

            case 5: {
                searchStudentByCourse();
                break;
            }

            case 0: {
                console.log("Cảm ơn bạn đã sử dụng chương trình. Tạm biệt!");
                isRunning = false;
                break;
            }

            default: {
                console.log("Lựa chọn không hợp lệ");
                break;
            }
        }
    }
}


runProgram();