from db.models import DbUser
from routers.schemas import UserBase
from sqlalchemy.orm.session import Session
from db.hashing import Hash

def create_user(db: Session, user: UserBase):
    new_user = DbUser(
        username = user.username,
        email = user.email,
        password = Hash.bcrypt(user.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user