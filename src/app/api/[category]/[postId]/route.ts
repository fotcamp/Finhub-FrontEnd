import { NextResponse } from "next/server";

type itemTypes = {
  id: number;
  title: string;
  definition: string;
  summary: string;
  content: string;
};

interface dataTypes {
  [key: string]: { [key: string]: itemTypes };
  stock: { [key: string]: itemTypes };
  fund: { [key: string]: itemTypes };
  etf: { [key: string]: itemTypes };
  irp: { [key: string]: itemTypes };
}

const data: dataTypes = {
  stock: {
    "1": {
      id: 1,
      title: "주식이란?",
      definition: "주식은 회사에 대한 소유권을 나타내는 유가 증권입니다.",
      summary: `"주식"은 기업의 소유권을 나타내는 단위입니다. 기업이 자본을 모으기 위해 주식을 발행하고, 이를 구매하는 투자자들은 그 기업의 일부 소유자가 되며, 이를 '주주'라고 부릅니다. 주식을 소유함으로써, 주주는 다음과 같은 권리를 갖게 됩니다`,
      content: `배당금: 기업이 이익을 낼 경우, 이익의 일부를 주주들에게 배당금으로 지급할 수 있습니다.

      투표권: 주주총회에서 기업의 중요한 결정에 투표할 권리를
      
      갖습니다. 이는 주주가 기업 운영에 목소리를 낼 수 있는 방법입니다.
      
      자산 가치 증가: 기업이 성장하고 성공하면 주식 가치가 올라갑니다. 이 경우, 주식을 더 높은 가격에 팔아 이익을 얻을 수 있습니다.
      주식 시장에서는 이러한 주식들이 거래됩니다. 주식 가격은 시장에서의 수요와 공급, 기업의 실적, 경제적 요인, 정치적 상황 등 다양한 요인에 의해 결정됩니다. 주식 투자는 잠재적으로 높은 수익을 가져다줄 수 있지만, 주식 가치가 하락할 위험도 포함하고 있습니다. 따라서, 주식 투자는 충분한 시장 분석과 자신의 재정 상태를 고려한 신중한 결정이 필요합니다.
      `,
    },
  },
  fund: {
    "1": {
      id: 1,
      title: "펀드란?",
      definition: "주식은 회사에 대한 소유권을 나타내는 유가 증권입니다.",
      summary: `"주식"은 기업의 소유권을 나타내는 단위입니다. 기업이 자본을 모으기 위해 주식을 발행하고, 이를 구매하는 투자자들은 그 기업의 일부 소유자가 되며, 이를 '주주'라고 부릅니다. 주식을 소유함으로써, 주주는 다음과 같은 권리를 갖게 됩니다`,
      content: `배당금: 기업이 이익을 낼 경우, 이익의 일부를 주주들에게 배당금으로 지급할 수 있습니다.

      투표권: 주주총회에서 기업의 중요한 결정에 투표할 권리를
      
      갖습니다. 이는 주주가 기업 운영에 목소리를 낼 수 있는 방법입니다.
      
      자산 가치 증가: 기업이 성장하고 성공하면 주식 가치가 올라갑니다. 이 경우, 주식을 더 높은 가격에 팔아 이익을 얻을 수 있습니다.
      주식 시장에서는 이러한 주식들이 거래됩니다. 주식 가격은 시장에서의 수요와 공급, 기업의 실적, 경제적 요인, 정치적 상황 등 다양한 요인에 의해 결정됩니다. 주식 투자는 잠재적으로 높은 수익을 가져다줄 수 있지만, 주식 가치가 하락할 위험도 포함하고 있습니다. 따라서, 주식 투자는 충분한 시장 분석과 자신의 재정 상태를 고려한 신중한 결정이 필요합니다.
      `,
    },
  },
  etf: {
    "1": {
      id: 1,
      title: "etf란?",
      definition: "주식은 회사에 대한 소유권을 나타내는 유가 증권입니다.",
      summary: `"주식"은 기업의 소유권을 나타내는 단위입니다. 기업이 자본을 모으기 위해 주식을 발행하고, 이를 구매하는 투자자들은 그 기업의 일부 소유자가 되며, 이를 '주주'라고 부릅니다. 주식을 소유함으로써, 주주는 다음과 같은 권리를 갖게 됩니다`,
      content: `배당금: 기업이 이익을 낼 경우, 이익의 일부를 주주들에게 배당금으로 지급할 수 있습니다.

      투표권: 주주총회에서 기업의 중요한 결정에 투표할 권리를
      
      갖습니다. 이는 주주가 기업 운영에 목소리를 낼 수 있는 방법입니다.
      
      자산 가치 증가: 기업이 성장하고 성공하면 주식 가치가 올라갑니다. 이 경우, 주식을 더 높은 가격에 팔아 이익을 얻을 수 있습니다.
      주식 시장에서는 이러한 주식들이 거래됩니다. 주식 가격은 시장에서의 수요와 공급, 기업의 실적, 경제적 요인, 정치적 상황 등 다양한 요인에 의해 결정됩니다. 주식 투자는 잠재적으로 높은 수익을 가져다줄 수 있지만, 주식 가치가 하락할 위험도 포함하고 있습니다. 따라서, 주식 투자는 충분한 시장 분석과 자신의 재정 상태를 고려한 신중한 결정이 필요합니다.
      `,
    },
  },
  irp: {
    "1": {
      id: 1,
      title: "irp란?",
      definition: "주식은 회사에 대한 소유권을 나타내는 유가 증권입니다.",
      summary: `"주식"은 기업의 소유권을 나타내는 단위입니다. 기업이 자본을 모으기 위해 주식을 발행하고, 이를 구매하는 투자자들은 그 기업의 일부 소유자가 되며, 이를 '주주'라고 부릅니다. 주식을 소유함으로써, 주주는 다음과 같은 권리를 갖게 됩니다`,
      content: `배당금: 기업이 이익을 낼 경우, 이익의 일부를 주주들에게 배당금으로 지급할 수 있습니다.

      투표권: 주주총회에서 기업의 중요한 결정에 투표할 권리를
      
      갖습니다. 이는 주주가 기업 운영에 목소리를 낼 수 있는 방법입니다.
      
      자산 가치 증가: 기업이 성장하고 성공하면 주식 가치가 올라갑니다. 이 경우, 주식을 더 높은 가격에 팔아 이익을 얻을 수 있습니다.
      주식 시장에서는 이러한 주식들이 거래됩니다. 주식 가격은 시장에서의 수요와 공급, 기업의 실적, 경제적 요인, 정치적 상황 등 다양한 요인에 의해 결정됩니다. 주식 투자는 잠재적으로 높은 수익을 가져다줄 수 있지만, 주식 가치가 하락할 위험도 포함하고 있습니다. 따라서, 주식 투자는 충분한 시장 분석과 자신의 재정 상태를 고려한 신중한 결정이 필요합니다.
      `,
    },
  },
};

export async function GET(
  request: Request,
  { params }: { params: { category: string; postId: string } }
) {
  const category = params.category;
  const postId = params.postId;

  if (Object.keys(data).includes(category)) {
    return NextResponse.json(data[category]["1"], {
      status: 200,
    });
  } else {
    return NextResponse.json("", {
      status: 404,
    });
  }
}

export async function POST(request: Request) {
  const res = await request.json();
  return NextResponse.json({ res });
}

export async function PUT(request: Request) {
  const res = await request.json();
  return NextResponse.json({ res: { method: "PUT" } });
}

export async function DELETE(request: Request) {
  const res = await request.json();
  return NextResponse.json({ res: { method: "DELETE" } });
}
