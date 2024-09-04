class Student {
    constructor(code, name, gender, dob, address) {
        this.code = code;
        this.name = name;
        this.gender = gender;
        this.dob = dob;
        this.address = address;
    }
}

class StudentManager {
    constructor() {
        this.students = JSON.parse(localStorage.getItem('students')) || [];
        this.updateTable();
    }

    addStudent(student) {
        this.students.push(student);
        this.save();
        this.updateTable();
    }

    updateStudent(index, student) {
        this.students[index] = student;
        this.save();
        this.updateTable();
    }

    deleteStudent(index) {
        this.students.splice(index, 1);
        this.save();
        this.updateTable();
    }

    save() {
        localStorage.setItem('students', JSON.stringify(this.students));
    }

    updateTable() {
        const tbody = document.querySelector('#studentsTable tbody');
        tbody.innerHTML = '';

        this.students.forEach((student, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.code}</td>
                <td>${student.name}</td>
                <td>${student.gender}</td>
                <td>${student.dob}</td>
                <td>${student.address}</td>
                <td>
                    <button onclick="editStudent(${index})">Sửa</button>
                    <button onclick="deleteStudent(${index})">Xoá</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
}

const studentManager = new StudentManager();

document.getElementById('studentForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const code = document.getElementById('studentCode').value;
    const name = document.getElementById('studentName').value;
    const gender = document.getElementById('studentGender').value;
    const dob = document.getElementById('studentDOB').value;
    const address = document.getElementById('studentAddress').value;

    const id = document.getElementById('studentId').value;

    if (id) {
        studentManager.updateStudent(id, new Student(code, name, gender, dob, address));
    } else {
        studentManager.addStudent(new Student(code, name, gender, dob, address));
    }

    document.getElementById('studentForm').reset();
    document.getElementById('studentId').value = '';
});

function editStudent(index) {
    const student = studentManager.students[index];
    document.getElementById('studentCode').value = student.code;
    document.getElementById('studentName').value = student.name;
    document.getElementById('studentGender').value = student.gender;
    document.getElementById('studentDOB').value = student.dob;
    document.getElementById('studentAddress').value = student.address;
    document.getElementById('studentId').value = index;
}

function deleteStudent(index) {
    if (confirm('Bạn có chắc chắn muốn xóa sinh viên này không?')) {
        studentManager.deleteStudent(index);
    }
}
