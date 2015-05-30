/*
 * @NovelScript
 * converter code by @夏洛特鸣泣
 * mail: 975534268@qq.com
 * Version: 1.01
 */

package sliceConverter;

import java.awt.*;
import java.awt.event.*;
import java.io.*;

import javax.sound.sampled.LineUnavailableException;
import javax.sound.sampled.UnsupportedAudioFileException;
import javax.swing.*;

public class ConverUI extends JFrame{
	
	private static final long serialVersionUID = 1L;
	
	JLabel l1 = new JLabel("原文件地址：    ");
	JTextField f1 = new JTextField("c:\\source.txt");
	JButton address1 = new JButton("...");
	JLabel l2 = new JLabel("生成文件地址：");
	JTextField f2 = new JTextField("c:\\slice.json");
	JButton address2 = new JButton("...");
	JButton start = new JButton("生成JSON文件");

	public ConverUI() {
		this.setTitle("Script-Json Converter ver1.01 @NovelScript");
		this.setSize(600, 160);
		this.setResizable(true);
		this.setDefaultCloseOperation(DISPOSE_ON_CLOSE);
		
		Dimension displaySize = Toolkit.getDefaultToolkit().getScreenSize();
		Dimension frameSize = this.getSize(); 
		if (frameSize.width > displaySize.width)
			frameSize.width = displaySize.width;
		if (frameSize.height > displaySize.height)
			frameSize.height = displaySize.height;
		this.setLocation((displaySize.width - frameSize.width) / 2,	
				(displaySize.height - frameSize.height) / 5 * 2);

		l1.setLabelFor(f1);
		l2.setLabelFor(f2);
		f1.setColumns(30);
		f2.setColumns(30);
		
		JPanel sourceArea = new JPanel();
		JPanel destArea = new JPanel();
		FlowLayout topLay = new FlowLayout();
		topLay.setAlignment(FlowLayout.CENTER);
		sourceArea.setLayout(topLay);
		destArea.setLayout(topLay);
		sourceArea.add(l1);
		sourceArea.add(f1);
		sourceArea.add(address1);
		destArea.add(l2);
		destArea.add(f2);
		destArea.add(address2);
		
		JPanel textArea = new JPanel();
		textArea.setLayout(new GridLayout(2,1,0,10));
		textArea.add(sourceArea);
		textArea.add(destArea);
		
		this.setLayout(new BorderLayout());
		this.add(textArea, BorderLayout.CENTER);
		this.add(start, BorderLayout.SOUTH);
		
		this.start.addActionListener(new startController());
		addressGetter aget = new addressGetter();
		this.address1.addActionListener(aget);
		this.address2.addActionListener(aget);

		this.setVisible(true);
	}
	
	public JFrame getFrame() {
		return this;
	}
	
	public class startController implements ActionListener {
		
		private String sourceAddress;
		private String destAddress;
		
		public void actionPerformed(ActionEvent e) {
			
			this.sourceAddress = f1.getText();
			this.destAddress = f2.getText();
			
			File f = new File(sourceAddress);
			if(!f.exists() || !f.canRead()) {
				JOptionPane.showMessageDialog(getFrame(), "错误：源文件不存在或无法读取。", "出错了~", JOptionPane.ERROR_MESSAGE);
				return ;
			}
			f = new File(destAddress);
			if(f.exists()) {
				Object[] options = {"是的，请继续~", "不了，修改一下"};
				int n = JOptionPane.showOptionDialog(getFrame(), "给定的生成文件已存在，继续程序将对其进行覆盖，" + 
				"确认要继续吗~？", "目标文件☆已存在",JOptionPane.YES_NO_OPTION, JOptionPane.QUESTION_MESSAGE, null, options, options[1]);
				if(n == 1) 
					return ;
			}
			else {
				try {
					f.createNewFile();
				} catch (IOException e1) {
					e1.printStackTrace();
				}
			}
			
			try {
				Converter c = new Converter(sourceAddress, destAddress);
				c.process(); 
				c.exit();
			} catch (IOException e2) {
				e2.printStackTrace();
			} catch (LineUnavailableException e1) {
				e1.printStackTrace();
			} catch (UnsupportedAudioFileException e1) {
				e1.printStackTrace();
			}
			
		}
	}
	
	public class addressGetter implements ActionListener {

		public void actionPerformed(ActionEvent e) {
			
			JFileChooser chooser = new JFileChooser();
			JTextField text;
			
			if(e.getSource() == address1) {
				chooser.setFileSelectionMode(JFileChooser.FILES_ONLY);
				text = f1;
			}
			else {
				chooser.setFileSelectionMode(JFileChooser.FILES_AND_DIRECTORIES);
				text = f2;
			}
			chooser.showDialog(getFrame(), "选择");
			File file = chooser.getSelectedFile();
			if(file != null) {
				if(file.isDirectory()) {
					text.setText(file.getAbsolutePath() + "/slice.json");
				}
				else if(file.isFile()) {
					text.setText(file.getAbsolutePath());
				}
			}
		}
		
	}
}
