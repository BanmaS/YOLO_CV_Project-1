import flask, json,requests

# 实例化api
api = flask.Flask(__name__)


def upload(path, tokens):
    headers = {
    'Authorization': tokens}
    files = {
    'smfile': open(path, 'rb')}
    url = 'https://sm.ms/api/v2/upload'
    res = requests.post(url, files=files, headers=headers).json()
    print(json.dumps(res, indent=4))

@api.route('/index',methods=['get'])
# get方式访问
def index():
  ren = {'msg':'成功访问接口','msg_code':200}
  return json.dumps(ren,ensure_ascii=False)


@api.route('/login', methods=['post'])
def login():
    # from-data格式参数
    filepath = flask.request.values.get('filepath')
    token = flask.request.values.get('token')
    print(filepath)
    print(token)
    upload(filepath, token)
    ren = {'msg': 'success', 'msg_code': 200}
    return json.dumps(ren, ensure_ascii=True)


if __name__ == '__main__':
    api.run(port=8888, debug=True, host='127.0.0.1')  # 启动服务
    # 'host='127.0.0.1'IP访问地址