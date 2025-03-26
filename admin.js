// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getDatabase, ref, set, update, remove, get, child } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAA4cw9OY45M6F6e-F86gEMDG71ERj4BY8",
    authDomain: "database-e7c68.firebaseapp.com",
    databaseURL: "https://database-e7c68-default-rtdb.firebaseio.com",
    projectId: "database-e7c68",
    storageBucket: "database-e7c68.firebasestorage.app",
    messagingSenderId: "315198861153",
    appId: "1:315198861153:web:3a376a04e7bc5ce230df20",
    measurementId: "G-69HD0NRH8T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Function to add a student
window.addStudent = function () {
    let studentId = document.getElementById("studentId").value;
    let name = document.getElementById("name").value;
    let rollno = document.getElementById("rollno").value;
    let branch = document.getElementById("branch").value;
    let mobile = document.getElementById("mobile").value;

    if (studentId === "" || name === "" || rollno === "" || branch === "" || mobile === "") {
        alert("Please fill all fields!");
        return;
    }

    set(ref(db, "students/" + studentId), {
        name: name,
        rollno: rollno,
        branch: branch,
        mobile: mobile
    }).then(() => {
        alert("Student added successfully!");
    }).catch((error) => {
        alert("Error: " + error);
    });
};

// Function to update a student
window.updateStudent = function () {
    let studentId = document.getElementById("updateStudentId").value;
    let name = document.getElementById("updateName").value;
    let rollno = document.getElementById("updateRollno").value;
    let branch = document.getElementById("updateBranch").value;
    let mobile = document.getElementById("updateMobile").value;

    if (studentId === "" || name === "" || rollno === "" || branch === "" || mobile === "") {
        alert("Please fill all fields!");
        return;
    }

    update(ref(db, "students/" + studentId), {
        name: name,
        rollno: rollno,
        branch: branch,
        mobile: mobile
    }).then(() => {
        alert("Student updated successfully!");
    }).catch((error) => {
        alert("Error: " + error);
    });
};

// Function to delete a student
window.deleteStudent = function () {
    let studentId = document.getElementById("deleteStudentId").value;

    if (studentId === "") {
        alert("Please enter a Student ID to delete!");
        return;
    }

    remove(ref(db, "students/" + studentId)).then(() => {
        alert("Student deleted successfully!");
    }).catch((error) => {
        alert("Error: " + error);
    });
};

// Function to fetch all students
window.fetchStudents = function () {
    const dbRef = ref(db, "students/");
    get(dbRef).then((snapshot) => {
        if (snapshot.exists()) {
            let students = snapshot.val();
            let studentList = document.getElementById("studentList");
            studentList.innerHTML = "<h4>Student List</h4>";
            Object.keys(students).forEach(studentId => {
                let student = students[studentId];
                studentList.innerHTML += `<p><strong>ID:</strong> ${studentId} | <strong>Name:</strong> ${student.name} | <strong>Roll No:</strong> ${student.rollno} | <strong>Branch:</strong> ${student.branch} | <strong>Mobile:</strong> ${student.mobile}</p>`;
            });
        } else {
            document.getElementById("studentList").innerHTML = "No students found.";
        }
    }).catch((error) => {
        alert("Error: " + error);
    });
};
