# SQLAlchemy excersie
from flask import Flask,render_template,request,flash,redirect
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


# Db configuration
app.secret_key = 'this is my seceret key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:1104@localhost/student'
app.config['SQLALCHEMY_TRACK_MODIFICATION'] = False
db = SQLAlchemy(app)

#creating db model - like table in db
class Registrants(db.Model):
    def __init__(self,name,dob,sport):
        self.name = name
        self.dob = dob
        self.sport = sport
    id = db.Column(db.Integer, primary_key=True ,autoincrement=True)
    name = db.Column(db.String(50))
    dob = db.Column(db.String(50))
    sport = db.Column(db.String(50))


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register',methods=['GET','POST'])
def register():
    if request.method == 'GET':
        return render_template('register.html')
    else:
        name = request.form['name'].capitalize()
        dob = request.form['dob']
        sport = request.form['sport']
        exists = db.session.query(Registrants).filter(Registrants.name == name, Registrants.dob == dob).all()
        if exists:
            flash('you have already registered')
            return redirect('/register')
        else:
            std = Registrants(name,dob,sport)
            db.session.add(std)
            db.session.commit()
            flash('successfully registered')
    return redirect('/register')

@app.route('/registrants')
def registrants():
    records = db.session.query(Registrants.name,Registrants.dob,Registrants.sport).all()
    return render_template('result.html',records=records)
if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')


