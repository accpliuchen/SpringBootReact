class App extends React.Component {
  constructor(props) {
      super(props);
      this.deleteStudent = this.deleteStudent.bind(this);
      this.createStudent = this.createStudent.bind(this);
      this.state = {
          students: [],
      };
   }

  componentDidMount() {
    this.loadStudentsFromServer();
  }

  // Load students from database
  loadStudentsFromServer() {
      fetch('http://localhost:8080/api/coins')
      .then((response) => response.json())
      .then((responseData) => {
          this.setState({
              students: responseData._embedded.coins,
          });
      });
  }

  // Delete student
  deleteStudent(student) {
      fetch (student._links.self.href,
      { method: 'DELETE',})
      .then(
          res => this.loadStudentsFromServer()
      )
      .catch( err => cosole.error(err))
  }

  // Create new student
  createStudent(student) {
      fetch('http://localhost:8080/api/students', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(student)
      })
      .then(
          res => this.loadStudentsFromServer()
      )
      .catch( err => cosole.error(err))
  }

  render() {
    return (
       <div>
          <StudentForm createStudent={this.createStudent}/>
          <StudentTable deleteStudent={this.deleteStudent} students={this.state.students}/>
       </div>
    );
  }
}

class StudentTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
    var students = this.props.students.map(student =>
        <Student key={student._links.self.href} student={student} deleteStudent={this.props.deleteStudent}/>
    );

    return (
      <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th><th>Buy Price</th><th>Sell Price</th><th> </th>
          </tr>
        </thead>
        <tbody>{students}</tbody>
      </table>
      </div>);
  }
}

class Student extends React.Component {
    constructor(props) {
        super(props);
        this.deleteStudent = this.deleteStudent.bind(this);
    }

    deleteStudent() {
        this.props.deleteStudent(this.props.student);
    }

    render() {
        return (
          <tr>
            <td>{this.props.student.name}</td>
            <td>{this.props.student.buyPrice}</td>
            <td>{this.props.student.sellPrice}</td>
            <td>
                <button className="btn btn-danger" onClick={this.deleteStudent}>Delete</button>
            </td>
          </tr>
        );
    }
}

class StudentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {firstname: '', lastname: '', email: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div>

            </div>

        );
    }
}

ReactDOM.render(<App />, document.getElementById('root') );