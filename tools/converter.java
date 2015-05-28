/*
 * made by @夏洛特鸣泣
 * mail: 975534268@qq.com
 */
package sliceConverter;

import java.io.*;
import java.nio.charset.Charset;
import java.util.*;

public class converter {
	private String SourceFile = "c:\\source.txt";
	private String DestinationFile = "c:\\toslice.txt";
	private InputStreamReader r;
	private OutputStreamWriter w;
	private BufferedReader br;
	private List<String> lastfigure = new ArrayList<String>(); 
	
	converter() throws IOException {
		this.r = new InputStreamReader(new FileInputStream(this.SourceFile), Charset.forName("UTF-8"));
		this.w = new OutputStreamWriter(new FileOutputStream(this.DestinationFile), Charset.forName("UTF-8"));
		this.br = new BufferedReader(this.r);
	}
	
	public static void main(String[] args) throws IOException {
		converter c = new converter(); 
		String line = c.readLine();
		if(line == null) {
			System.out.println("Error, the source file is empty.\n");
			return ;
		}
		c.w.write("{\n\"id" + c.readScriptId(line) + "\":\n");
		line = c.readLine();
		int counter = 0;
		while(line != null) {
			if(c.checkLineType(line)) {
				counter = 0;
				c.w.write("\n],\n\"id" + c.readScriptId(line) + "\":\n[\n");
			}
			else {
				if(counter != 0) c.w.write(",\n");
				c.w.write("{" + c.converslice(line, counter) + "}");
				counter++;
			}
			line = c.readLine();
		}
		c.w.write("\n]\n}");
		c.w.close();
		c.r.close();
	}
	
	public String readLine() throws IOException {
		String line = this.br.readLine();
		System.out.println(line);
		return line;
	}

	public String converslice(String line, int counter) {
		String[] lineList = {null, null, "true", "false", "false", "false", "false", "false",
				"true", "true", "true", "true", "0", "false"};
		int i, j;
		i = line.indexOf((int) '[');
		if(i >= 0) {
			j = line.indexOf((int) ']');
			
			if(line.substring(i + 1, j).indexOf((int) '.') < 0 && line.substring(i + 1, j).indexOf((int) '0') < 0) {
				lineList[0] = line.substring(i + 1, j);
				line = line.substring(j + 1);
				i = line.indexOf((int) '[');
				j = line.indexOf((int) ']');
			}
			
			if(i >= 0 && line.substring(1,4).equals("con")) {
				lineList[2] = line.substring(5,j);
				line = line.substring(j + 1);
				i = line.indexOf((int) '[');
				j = line.indexOf((int) ']');
			}
			
			if(i >= 0 && line.substring(i + 1, j).indexOf((int) ':') < 0) {
				if(counter == 0 || this.lastfigure.size() == 0) {
					String[] figure = line.substring(i + 1, j).split(",");
					for(int k = 0; k < figure.length; k++) {
						this.lastfigure.add(figure[k]);
					}
				}
				else {
					String[] instructions = line.substring(i + 1, j).split(",");
					List<String> nextfigure = new ArrayList<String>();
					if(instructions.length == this.lastfigure.size()) {
						for(int k = 0; k < instructions.length; k++) {
							if(!instructions[k].equals("0") && !instructions[k].equals("")) 
								nextfigure.add(instructions[k]);
							else if(instructions[k].equals("")) 
								nextfigure.add(this.lastfigure.get(k));
						}
					}
					else if(this.lastfigure.size() == 1) {
						for(int k = 0; k < instructions.length; k++) {
							if(!instructions[k].equals("0") && !instructions[k].equals(""))
								nextfigure.add(instructions[k]);
							else if(instructions[k].equals(""))
								nextfigure.add(this.lastfigure.get(0));
						}
					}
					else {
						if(!instructions[0].equals("0") && !instructions[0].equals("")) {
							nextfigure.add(instructions[0]);
							for(int k = 0; k < instructions.length - 1; k++) {
								if(!instructions[k+1].equals("0") && !instructions[k+1].equals(""))
									nextfigure.add(instructions[k]);
								else if(instructions[k+1].equals(""))
									nextfigure.add(this.lastfigure.get(k));
							}
						}
						else {
							if(instructions[0].equals(""))
								nextfigure.add(this.lastfigure.get(0));
							for(int k = 0; k < 2; k++) {
								if(!instructions[k+1].equals("0") && !instructions[k+1].equals(""))
									nextfigure.add(instructions[k]);
								else if(instructions[k+1].equals(""))
									nextfigure.add(this.lastfigure.get(1));
							}
						}
					}
					this.lastfigure = nextfigure;
				}

				if(this.lastfigure.size() == 1) {
					lineList[5] = this.lastfigure.get(0);
				}
				if(this.lastfigure.size() == 2) {
					lineList[4] = this.lastfigure.get(0);
					lineList[6] = this.lastfigure.get(1);
				}
				if(this.lastfigure.size() == 3) {
					lineList[3] = this.lastfigure.get(0);
					lineList[5] = this.lastfigure.get(1);
					lineList[7] = this.lastfigure.get(2);
				}
				line = line.substring(j + 1);
				i = line.indexOf((int) '[');
				j = line.indexOf((int) ']');
			}
			
			if(i >= 0 && line.substring(1,3).equals("cg")) {
				lineList[8] = "\"" + line.substring(4,j) + "\"";
				line = line.substring(j + 1);
				i = line.indexOf((int) '[');
				j = line.indexOf((int) ']');
			}
			
			if(i >= 0 && line.substring(1,3).equals("bg") && !line.substring(1,4).equals("bgm")) {
				lineList[9] = "\"" + line.substring(4,j) + "\"";
				line = line.substring(j + 1);
				i = line.indexOf((int) '[');
				j = line.indexOf((int) ']');
			}
			
			if(i >= 0 && line.substring(1,4).equals("bgm")) {
				lineList[10] = "\"" + line.substring(5,j) + "\"";
				line = line.substring(j + 1);
				i = line.indexOf((int) '[');
				j = line.indexOf((int) ']');
			}
			
			if(i >= 0 && line.substring(1,6).equals("voice")) {
				lineList[11] = "\"" + line.substring(7,j) + "\"";
				line = line.substring(j + 1);
				i = line.indexOf((int) '[');
				j = line.indexOf((int) ']');
			}
			
			if(i >= 0 && line.substring(1,5).equals("wait")) {
				lineList[12] = line.substring(6,j);
				line = line.substring(j + 1);
				i = line.indexOf((int) '[');
				j = line.indexOf((int) ']');
			}
			
			if(i >= 0 && line.substring(1,7).equals("effect")) {
				lineList[12] = line.substring(8,j);
				line = line.substring(j + 1);
				i = line.indexOf((int) '[');
				j = line.indexOf((int) ']');
			}
		}
		//i = line.indexOf((int) '"');
		//lineList[1] = new String(line.substring(i));
		lineList[1] = new String("\"" + line + "\"");
		String slice = "\"speaker\":" + lineList[0] + ",\"dialogue\":" + lineList[1]
				+ ",\"condition\":" + lineList[2] + ",\"figure\":[" + lineList[3] + ","
				+ lineList[4] + "," + lineList[5] + "," + lineList[6] + "," + lineList[7]
				+ "],\"cg\":" + lineList[8] + ",\"bg\":" + lineList[9] + ",\"bgm\":"
				+ lineList[10] + ",\"voice\":" + lineList[11] + ",\"wait\":"  + lineList[12]
				+ ",\"effect\":" + lineList[13];
		return slice;
	}
	
	public boolean checkLineType(String line) {
		if(line.substring(1,8).equals("script:"))
			return true;
		else return false;
	}
	
	public String readScriptId(String line) {
		StringBuffer id = new StringBuffer();
		for(char c : line.toCharArray()) {
			if(c <= '9' && c>= '0') id.append(c);
		}
		return id.toString();
	}
}
