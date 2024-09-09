from flask_sqlalchemy import SQLAlchemy
from datetime import date
from werkzeug.security import generate_password_hash
from enum import Enum

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    name = db.Column(db.String(80), unique=False)
    register_date = db.Column(db.Date, default=date.today())
    url_image = db.Column(db.String(500))
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "register_date": self.register_date,
            "url_image": self.url_image,
            "is_active": self.is_active,
            # do not serialize the password, its a security breach
        }
    
class Account(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    account_type = db.Column(db.String(80), unique=False, nullable=False)
    initial_state = db.Column(db.Integer, unique=False, nullable=False)
    register_date = db.Column(db.Date, default=date.today())
    credit_limit = db.Column(db.Integer, unique=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<Account {self.name}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "account_type": self.account_type,
            "initial_state": self.initial_state,
            "register_date": self.register_date,
            "credit_limit": self.credit_limit,
            "is_active": self.is_active,
        }

class Report(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    total_income = db.Column(db.Float, nullable=False)
    total_expenses = db.Column(db.Float, nullable=False)
    # user_id = relation

    def __repr__(self):
        return f'<Report {self.start_date, self.end_date}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "start_date": self.start_date,
            "end_date": self.end_date,
            "total_income": self.total_income,
            "total_expenses": self.total_expenses,
        }

class Type(Enum):
    INCOME = 'income'
    EXPENSE = 'expense'

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    type = db.Column(db.Enum(Type), nullable=False)
    # user_id = relation

    def __repr__(self):
        return f'<Category {self.name}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "type": self.type,
        }
