# 工具
## Converter
Converter是一款可以把格式化的galgame剧本转换成json文件的软件。需注意，转换前的原始文件需以UTF-8编码，生成的文件也将以UTF-8编码。

原始文本格式：
···
[script:(数字编号)]
[(说话人，不继承上一句)][(立绘地址,如果有多个，以","隔开。以0代表消除上一句的对应立绘，以""代表继承上一句对应位置的立绘)][cg:(cg地址,不继承)][bg:(bg地址,不继承)][bgm:(bgm地址,不继承)][voice:(声音地址,不继承)][wait:(自动状态的等待时间，默认为voice的长度，不继承)]（文本内容）
···
案例：
原始文本：
···
[script:01]
[立夏][lixia1.png][bg:classroom1.jpg][bgm:afternoon.mp3]下午好。
[雨遥][,yuyao1.png]再见。
[,0]雨遥离开了。
···

生成json文件内容：
···json
{
"id01":
{"slice":0,"speaker":"立夏","dialogue":"下午好。","figure":[false,false,"lixia1.png",false,false],"cg":true,"bg":"classroom1.jpg","bgm":"afternoon.mp3","voice":true,"wait":0},
{"slice":1,"speaker":"雨遥","dialogue":"再见。","figure":[false,"lixia1.png",false,"yuyao1.png",false],"cg":true,"bg":true,"bgm":true,"voice":true,"wait":0},
{"slice":2,"speaker":null,"dialogue":"雨遥离开了。","figure":[false,false,"lixia1.png",false,false],"cg":true,"bg":true,"bgm":true,"voice":true,"wait":0}
]
}
···
注意：由于未搭载格式检验功能，因此原始文本内的格式错误可能导致所生成的json文件出现错误。



Converter调用示例：

1.窗口调用：
···java
JFrame f = new ConverUI();
···
2.Converter本体的使用：
···java
Converter c = new Converter(SourceFileAddress, DestinationFileAddress);
c.process();
···

注意：Converter依赖jre运行