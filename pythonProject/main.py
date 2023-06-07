import random
from flask import Flask, jsonify, request
import pandas as pd
import numpy as np
import math
from sqlalchemy import create_engine
import pymysql
from werkzeug.utils import secure_filename

app = Flask(__name__)

# n자리의 난수 생성
def randNumber(num):
    number = ""

    for i in range (0, num+1):
        number += str(random.randrange(0, 10))

    return number

# 경사각 데이터를 정제 후 table로 저장
def refineTiltData(filename, key):
    print("refineTiltData 실행")
    # modifiedFilename = filename[:-4]
    df = pd.read_csv(filename)
    # modify를 할 필요가 있을까? - 데이터 변환용
    modifyDf={ i:df[i]+random.uniform(-(abs(max(df[i]))-abs(min(df[i]))/2),(abs(max(df[i]))-abs(min(df[i]))/2)) if idx>0 else df[i] for idx,  i in enumerate(df) }
    # pd.DataFrame(modifyDf).to_csv(modifiedFilename + ".csv")

    # 경사각 계산
    obj={}
    for idx, key in enumerate(modifyDf):
        if(key == 'opdatetime') :
            obj.setdefault(key,modifyDf[key])
        else:
            if(idx%2==0):
                obj.update({key[:-2] : [math.atan2(x,y)*180/math.pi for x,y in zip(obj[key[:-2]],  modifyDf[key])]})
            else:
                obj.setdefault(key[:-2],  modifyDf[key])
    pd.DataFrame(obj).to_csv(key + "_modified.csv")

    # table 생성
    data = pd.DataFrame(obj)
    engine = create_engine('mysql+pymysql://root:1234@localhost/db')
    conn = engine.connect()

    data.to_sql(name=key + "_tilt", if_exists="replace", con=engine)

# 구조 데이터를 정제 후 table로 저장
def refineLocData(filename, key):
    print("refineLocData 실행")
    df = pd.read_csv(filename)
    # modifiedFilename = filename[:-4]

    # 유효하지 않은 값(0) 정제하기
    location = {}
    column = [i for i in df.columns]

    for i in range(len(column)):
        if i < 3:
            location.update({column[i]: df[column[i]]})
        elif i>=3:
            if df[column[i]].mean() != 0:
                location.update({column[i]: df[column[i]].mean()})

    # pd.DataFrame(location).to_csv(key + ".csv")

    # table 생성
    data = pd.DataFrame(location)
    engine = create_engine('mysql+pymysql://root:1234@localhost/db')
    conn = engine.connect()

    data.to_sql(name=key + "_loc", if_exists="replace", con=engine)

def insertInfo(info, key):
    print(type(info))

    print("성명: ", info["name"])
    print("전화번호", info["phone"])
    print("이메일 주소: ", info["email"])
    print("비밀번호: ", info["password"])

def insertInfoImage(info, key):
    print(type(info))

    print("성명: ", info["name"])
    print("전화번호", info["phone"])
    print("이메일 주소: ", info["email"])
    print("비밀번호: ", info["password"])



@app.route("/insert", methods=["post"])
def registerFiles(file=None):
    info = request.form
    key = request.form["name"] + randNumber(4)
    file = request.files.getlist("file[]")
    flag = "false"

    # 데이터 파일 table 저장 & 이미지 저장
    if file == "":
        print("파일이... 비었어?")
    else:
        print("파일 들어왔어요호호호홍")
        for i in file:
            i.save(secure_filename(i.filename))

            if i.filename.find("tilt") != -1:
                print("경사 데이터 파일 들어옴")
                refineTiltData(i.filename, key)
            elif i.filename.find("png") != -1 or i.filename.find("jpg") != -1:
                i.save("./img/" + secure_filename(key))
                flag = "true"
            else:
                print("위치 데이터 파일 들어옴")
                refineLocData(i.filename, key)

    if flag == "false":
        insertInfo(info, key)
    else:
        insertInfoImage(info, key)

if __name__ == '__main__':
    app.run()