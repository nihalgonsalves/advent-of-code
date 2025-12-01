const getRegister = (line: string) =>
	Number.parseInt(/Register \w: (\d+)/.exec(line)![1], 10);

class HaltError extends Error {}

class Computer {
	registerA: number;
	registerB: number;
	registerC: number;
	program: number[];
	cursor = 0;
	output: number[] = [];

	constructor(input: string[]) {
		const [registerA, registerB, registerC, program] = input;

		this.registerA = getRegister(registerA);
		this.registerB = getRegister(registerB);
		this.registerC = getRegister(registerC);
		this.program = program
			.matchAll(/(\d+),?/g)
			.map((p) => Number.parseInt(p[0], 10))
			.toArray();

		this.log(`Program: ${this.program.join(",")}`);
	}

	run() {
		while (this.cursor < this.program.length) {
			try {
				this.step();
			} catch (e) {
				if (e instanceof HaltError) {
					break;
				}
			}
		}
	}

	step() {
		this.log("------------------------------");
		this.log(`Cursor: ${this.cursor}`);
		this.log(`Register A: ${this.registerA}`);
		this.log(`Register B: ${this.registerB}`);
		this.log(`Register C: ${this.registerC}`);

		switch (this.program[this.cursor]) {
			case 0:
				this.log("0 (adv)");
				this.adv();
				break;
			case 1:
				this.log("1 (bxl)");
				this.bxl();
				break;
			case 2:
				this.log("2 (bst)");
				this.bst();
				break;
			case 3:
				this.log("3 (jnz)");
				this.jnz();
				break;
			case 4:
				this.log("4 (bxc)");
				this.bxc();
				break;
			case 5:
				this.log("5 (out)");
				this.out();
				break;
			case 6:
				this.log("6 (bdv)");
				this.bdv();
				break;
			case 7:
				this.log("7 (cdv)");
				this.cdv();
				break;
		}
	}

	next() {
		this.cursor += 2;

		if (this.program[this.cursor] == null) {
			throw new HaltError();
		}
	}

	combo(operand: number) {
		return {
			0: 0,
			1: 1,
			2: 2,
			3: 3,
			4: this.registerA,
			5: this.registerB,
			6: this.registerC,
		}[operand]!;
	}

	comboOperand() {
		return this.combo(this.operand());
	}

	operand() {
		if (this.program[this.cursor + 1] == null) {
			throw new HaltError();
		}

		return this.program[this.cursor + 1];
	}

	log(statement: string) {
		if (process.env.PRINT) {
			console.log(statement);
		}
	}

	adv() {
		this.registerA = Math.trunc(this.registerA / 2 ** this.comboOperand());
		this.next();
	}

	bxl() {
		this.registerB = this.registerB ^ this.operand();
		this.next();
	}

	bst() {
		this.registerB = this.comboOperand() % 8;
		this.next();
	}

	jnz() {
		if (this.registerA !== 0) {
			this.cursor = this.operand();
		} else {
			this.next();
		}
	}

	bxc() {
		this.registerB = this.registerB ^ this.registerC;
		this.next();
	}

	out() {
		this.output.push(this.comboOperand() % 8);
		this.log(`Out: ${this.output.join(",")}`);
		this.next();
	}

	bdv() {
		this.registerB = Math.trunc(this.registerA / 2 ** this.comboOperand());
		this.next();
	}

	cdv() {
		this.registerC = Math.trunc(this.registerA / 2 ** this.comboOperand());
		this.next();
	}
}

export const run1 = (input: string[]): string => {
	const computer = new Computer(input);
	computer.run();
	return computer.output.join(",");
};

export const run2 = (_input: string[]): number => {
	return 0;
};
