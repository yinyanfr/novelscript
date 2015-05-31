/*
 * @NovelScript
 * converter code by @夏洛特鸣泣
 * mail: 975534268@qq.com
 * Version: 1.01
 */

package sliceConverter;

import java.io.*;
import java.nio.charset.Charset;
import java.util.*;

import javax.sound.sampled.*;
import javax.swing.*;

public class Converter {
	private InputStreamReader r;
	private OutputStreamWriter w;
	private BufferedReader br;
	private List<String> lastfigure = new ArrayList<String>(); 
	
	public static void main(String[] arg) {
		@SuppressWarnings("unused")
		JFrame f = new ConverUI();
	}
	
	public Converter(String SourceFile, String DestinationFile) throws IOException {
		this.r = new InputStreamReader(new FileInputStream(SourceFile), Charset.forName("UTF-8"));
		this.w = new OutputStreamWriter(new FileOutputStream(DestinationFile), Charset.forName("UTF-8"));
		this.br = new BufferedReader(this.r);
	}
	
	public Converter(InputStreamReader isr, OutputStreamWriter osw) {
		this.r = isr;
		this.w = osw;
		this.br = new BufferedReader(this.r);
	}
	
	public void process() throws IOException, LineUnavailableException, UnsupportedAudioFileException { 
		String line = this.readLine();
		if(line == null) {
			System.out.println("Error, the source file is empty.\n");
			return ;
		}
		this.w.write("{\n\"id" + this.readScriptId(line) + "\":\n[\n");
		line = this.readLine();
		int counter = 0;
		while(line != null) {
			if(this.checkLineType(line)) {
				counter = 0;
				this.w.write("\n],\n\"id" + this.readScriptId(line) + "\":\n[\n");
			}
			else {
				if(counter != 0) this.w.write(",\n");
				this.w.write("{" + this.converslice(line, counter) + "}");
				counter++;
			}
			line = this.readLine();
		}
		this.w.write("\n]\n}");
		this.w.close();
		this.r.close();
	}
	
	private String readLine() throws IOException {
		String line = this.br.readLine();
//		System.out.println(line);
		return line;
	}

	private String converslice(String line, int counter) throws LineUnavailableException, UnsupportedAudioFileException, IOException {
		String[] lineList = {null, null, "true", "false", "false", "false", "false", "false",
				"true", "true", "true", "false", "5000", "false"};
		int i, j;
		i = line.indexOf((int) '[');
		if(i >= 0) {
			j = line.indexOf((int) ']');
			
			if(i+1 != j && line.substring(i + 1, j).indexOf((int) ',') < 0 && line.substring(i + 1, j).indexOf((int) '0') < 0) {
				lineList[0] = "\"" + line.substring(i + 1, j) + "\"";
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
					lineList[5] = "\"" + this.lastfigure.get(0) + "\"";
				}
				if(this.lastfigure.size() == 2) {
					lineList[4] = "\"" + this.lastfigure.get(0) + "\"";
					lineList[6] = "\"" + this.lastfigure.get(1) + "\"";
				}
				if(this.lastfigure.size() == 3) {
					lineList[3] = "\"" + this.lastfigure.get(0) + "\"";
					lineList[5] = "\"" + this.lastfigure.get(1) + "\"";
					lineList[7] = "\"" + this.lastfigure.get(2) + "\"";
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
				lineList[12] = VoiceLength(line.substring(7,j));
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
		}
		
		lineList[1] = new String("\"" + line + "\"");
		String slice ="\"slice\":" + counter  + ",\"speaker\":" + lineList[0] + ",\"dialogue\":" + lineList[1]
				 + ",\"figure\":[" + lineList[3] + ","
				+ lineList[4] + "," + lineList[5] + "," + lineList[6] + "," + lineList[7]
				+ "],\"cg\":" + lineList[8] + ",\"bg\":" + lineList[9] + ",\"bgm\":"
				+ lineList[10] + ",\"voice\":" + lineList[11] + ",\"wait\":"  + lineList[12];
		return slice;
	}
	
	private boolean checkLineType(String line) {
		if(line.length() > 8) {
			if(line.substring(1,8).equals("script:"))
				return true;
		}
		return false;
	}
	
	private String readScriptId(String line) {
		StringBuffer id = new StringBuffer();
		for(char c : line.toCharArray()) {
			if(c <= '9' && c>= '0') id.append(c);
		}
		
		return id.toString();
	}
	
	private String VoiceLength(String url) throws LineUnavailableException, UnsupportedAudioFileException, IOException {
		File f = new File(url);
		Clip c = AudioSystem.getClip();
		AudioInputStream ais = AudioSystem.getAudioInputStream(f);
		c.open(ais);
		int time = (int) (c.getMicrosecondLength() / 1000D + 3000);
		c.close();
		return Integer.toString(time);
	}
	
	public void exit() throws IOException {
		this.r.close();
		this.w.close();
	}
}
