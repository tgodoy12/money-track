from flask_sqlalchemy import SQLAlchemy
from datetime import date
from werkzeug.security import generate_password_hash
from enum import Enum

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), unique=False, nullable=False)
    name = db.Column(db.String(80), unique=False)
    register_date = db.Column(db.Date, default=date.today())
    url_image = db.Column(db.String(500))
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    accounts = db.relationship('Account', backref='user', lazy=True)
    reports = db.relationship('Report', backref='user', lazy=True)
    categories = db.relationship('Category', backref='user', lazy=True)
    transactions = db.relationship('Transaction', backref='user', lazy=True)
    budgets = db.relationship('Budget', backref='user', lazy=True)

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

class Account_Type(Enum):
    BANK = 'bank'
    CREDIT_CARD = 'credit card'
    CASH = 'cash'

class Account(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    account_type = db.Column(db.Enum(Account_Type), nullable=False)
    initial_state = db.Column(db.Float, unique=False, nullable=False)
    register_date = db.Column(db.Date, default=date.today())
    credit_limit = db.Column(db.Float, unique=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    budgets = db.relationship('Budget', backref='account', lazy=True)

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
    
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

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
    
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    # transaction 1:1 relation
    transaction = db.relationship('Transaction', backref='category', uselist=False)

    # budget 1:1 relation
    budget = db.relationship('Budget', backref='category', uselist=False)

    def __repr__(self):
        return f'<Category {self.name}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "type": self.type,
        }

class Schedule(Enum):
    daily = 'daily'
    weekly = 'weekly'
    biweekly = 'biweekly'
    monthly = 'monthly'
    bimonthly = 'bimonthly'
    quarterly = 'quarterly'
    semiannually = 'semiannually'
    annually = 'annually'
    

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    type = db.Column(db.Enum(Type), nullable=False)
    register_date = db.Column(db.Date, default=date.today(), nullable=False)
    url_ticket_image = db.Column(db.String(500))
    description = db.Column(db.String(500))
    schedule = db.Column(db.Enum(Schedule), nullable=False)
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    # cuenta_id = relation

    # category_id 1:1 relation
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), unique=True, nullable=False)

    def __repr__(self):
        return f'<Transaction {self.id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "amount": self.amount,
            "type": self.type,
            "register_date": self.register_date,
            "url_ticket_image": self.url_ticket_image,
            "description": self.description,
            "schedule": self.schedule,
            "start_date": self.start_date,
            "end_date": self.end_date,
        }

class Budget(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    limit_amount = db.Column(db.Float, nullable=False)
    schedule = db.Column(db.Enum(Schedule), nullable=False)

    # user_id = relation
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    # cuenta_id = relation
    account_id = db.Column(db.Integer, db.ForeignKey('account.id'), nullable=False)

    # categoria_id 1:1 relation
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), unique=True, nullable=False)

    def __repr__(self):
        return f'<Budget {self.id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "limit_amount": self.limit_amount,
            "schedule": self.schedule,
        }